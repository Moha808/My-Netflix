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

      {/* Signup Form Container */}
      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center py-10 px-4 md:px-0">
        <div 
          className="bg-black/80 rounded-md w-full max-w-[450px] mx-auto text-left shadow-2xl flex flex-col"
          style={{ padding: '60px 68px 40px', minHeight: '550px' }}
        >
          <h1 className="text-white text-[32px] font-bold mb-7">Sign Up</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              className="bg-[#e50914] text-white font-medium text-base rounded mt-6 hover:bg-[#c11119] transition duration-200 ease-in-out h-[48px]"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-16 text-[#737373] text-[16px]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white hover:underline font-medium"
            >
              Sign in now.
            </Link>
          </div>

          <div className="mt-4 text-[13px] text-[#8c8c8c] text-left leading-tight">
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
