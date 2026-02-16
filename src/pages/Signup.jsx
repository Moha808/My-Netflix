import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import FloatingLabelInput from "../components/FloatingLabelInput";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password || !confirmPassword || !displayName) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password, displayName);
      toast.success("Account created successfully!");
      navigate("/profile");
    } catch (error) {
      const errorMessages = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-email": "Invalid email address.",
        "auth/weak-password": "Password is too weak.",
      };
      toast.error(
        errorMessages[error.code] ||
          "Failed to create account. Please try again.",
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

      {/* Signup Form Container */}
      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center py-10 px-4">
        <Link to="/login" className="mb-6">
          <h1 className="text-netflix-red text-5xl font-bold cursor-pointer">
            NETFLIX
          </h1>
        </Link>
        <div className="bg-black/80 border border-transparent rounded-lg px-8 py-12 md:px-16 md:py-16 w-full max-w-[450px] mx-auto shadow-xl">
          <h2 className="text-white text-[32px] font-bold mb-9">Sign Up</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <FloatingLabelInput
              id="displayName"
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <FloatingLabelInput
              id="email"
              type="email"
              placeholder="Email address"
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

            <FloatingLabelInput
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#e50914] text-white font-medium text-lg py-3 rounded mt-4 hover:bg-[#c11119] transition duration-200 ease-in-out"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-14 text-[#737373] text-[16px]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white hover:underline font-medium"
            >
              Sign in now.
            </Link>
          </div>

          <div className="mt-5 text-[13px] text-[#8c8c8c] text-left leading-tight">
            By signing up, you agree to our{" "}
            <span className="text-[#0071eb] hover:underline cursor-pointer">
              Terms of Use
            </span>{" "}
            and{" "}
            <span className="text-[#0071eb] hover:underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
