import { Link, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate({
      to: "/auth",
      state: { showRegister: true },
    });
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
            >
              URL Shortener
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <button
                  onClick={handleRegisterClick}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition-all"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
