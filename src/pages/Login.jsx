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
    <div className="relative min-h-screen w-full bg-[#141414]">
      {/* Generic Dark Background Image (No logos) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')",
          opacity: 0.4
        }}
      ></div>

      {/* Login Form Container */}
      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center py-10 px-4 md:px-0">
        <div 
          className="bg-black/80 rounded-md w-full max-w-[450px] mx-auto text-left shadow-2xl flex flex-col"
          style={{ padding: '60px 68px 40px', minHeight: '550px' }}
        >
          <h1 className="text-white text-[32px] font-bold mb-7">Sign In</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              className="bg-[#e50914] text-white font-medium text-base rounded mt-6 hover:bg-[#c11119] transition duration-200 ease-in-out h-[48px]"
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

          <div className="mt-16 text-[#737373] text-[16px]">
            New to Netflix?{" "}
            <Link
              to="/signup"
              className="text-white hover:underline font-medium"
            >
              Sign up now.
            </Link>
          </div>

          <div className="mt-4 text-[13px] text-[#8c8c8c] text-left leading-tight">
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
