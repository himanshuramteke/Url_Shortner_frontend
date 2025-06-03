import { UrlForm } from "../components/UrlForm";
import { UserUrl } from "../components/UserUrl";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { toast } from 'react-hot-toast';

export const DashBoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if(!confirmLogout) return;

    toast("Logging out...", {
      icon: "⏳",
      duration: 2000,
    });
    setTimeout(() => {
      dispatch(logout());
      toast.success("Logged out successfully!");
      navigate({ to: "/" });
    }, 2000); 
  };

  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-4xl border border-gray-700 relative">
      <button
        onClick={handleLogout}
        className="absolute cursor-pointer top-4 right-4 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
      >
        Logout
      </button>
      <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Dashboard
      </h1>
      <UrlForm />
      <UserUrl />
    </div>
  );
};