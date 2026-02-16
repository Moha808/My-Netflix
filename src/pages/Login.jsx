import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import FloatingLabelInput from "../components/FloatingLabelInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      const errorMessages = {
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/invalid-email": "Invalid email address.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/invalid-credential": "Invalid email or password.",
      };
      toast.error(
        errorMessages[error.code] || "Failed to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black md:bg-transparent">
      {/* Background Image - show on all screens */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat block"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4357-8042-6975eb142b3c/f8e918c7-4352-4e08-8e6f-12dd5112526e/US-en-20231023-popsignuptwoithreads-perspective_alpha_website_large.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center py-10 px-4">
        <Link to="/" className="mb-6">
          <h1 className="text-netflix-red text-5xl font-bold cursor-pointer">
            NETFLIX
          </h1>
        </Link>
        <div className="bg-black/80 border border-transparent rounded-lg px-8 py-12 md:px-16 md:py-16 w-full max-w-[450px] mx-auto shadow-xl">
          <h2 className="text-white text-[32px] font-bold mb-9">Sign In</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <FloatingLabelInput
              id="email"
              type="text"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FloatingLabelInput
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#e50914] text-white font-medium text-lg py-3 rounded mt-4 hover:bg-[#c11119] transition duration-200 ease-in-out"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="flex items-center justify-between mt-4 text-[13px] text-[#b3b3b3]">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="accent-[#737373] w-4 h-4 rounded-sm bg-[#333] border-0 focus:ring-0"
              />
              Remember me
            </label>
            <span className="hover:underline cursor-pointer">Need help?</span>
          </div>

          <div className="mt-14 text-[#737373] text-[16px]">
            New to Netflix?{" "}
            <Link
              to="/signup"
              className="text-white hover:underline font-medium"
            >
              Sign up now.
            </Link>
          </div>

          <div className="mt-5 text-[13px] text-[#8c8c8c] text-left leading-tight">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <span className="text-[#0071eb] hover:underline cursor-pointer">
              Learn more.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
