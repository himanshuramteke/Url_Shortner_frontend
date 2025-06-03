export const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-4 text-center">
      <p className="text-gray-400 text-sm">
        © {new Date().getFullYear()} URL Shortener. All rights reserved.
      </p>
    </footer>
  );
};