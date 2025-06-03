import { Outlet } from "@tanstack/react-router";
import { NavBar } from "./components/NavBar";
import { Toaster } from 'react-hot-toast';
import { Footer } from "./components/Footer";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-4">
        <Outlet /> {/* This renders your current route */}
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}

export default RootLayout;