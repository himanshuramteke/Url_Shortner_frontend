import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { registerUserApi } from "../apis/user.api";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export const RegisterForm = ({ onSwitchAuth }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    setError("");
    toast.loading("Creating Account....", { id: "register" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const data = await registerUserApi(name, password, email);
      toast.success("Account created successfully", { id: "register" });
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
    } catch (error) {
      toast.error(error.message || "Registration failed", { id: "register" });
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800 shadow-xl rounded-lg px-8 pt-10 pb-8 mb-4 border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-md border border-red-700/50">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label
            className="block text-gray-300 text-sm font-medium mb-2"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            className="bg-gray-700 text-gray-200 shadow appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-300 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="bg-gray-700 text-gray-200 shadow appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-8 relative">
          <label
            className="block text-gray-300 text-sm font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="bg-gray-700 text-gray-200 shadow appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-400">Minimum 6 characters</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <button
            className={`w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <button
              onClick={onSwitchAuth}
              className="text-purple-400 hover:text-purple-300 cursor-pointer font-medium transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
