import { UrlForm } from "../components/UrlForm"
import { Link } from "@tanstack/react-router"

export const HomePage = () => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Description Section - Outside the form */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          URL Shortener
        </h1>
        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          Transform your long URLs into short, shareable links in seconds. 
          Perfect for social media, emails, and anywhere you need clean, 
          professional-looking links.
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400 mb-8">
          <span className="bg-gray-700 px-4 py-2 rounded-full">✨ Instant shortening</span>
          <span className="bg-gray-700 px-4 py-2 rounded-full">📊 Click tracking</span>
          <span className="bg-gray-700 px-4 py-2 rounded-full">🔒 Secure links</span>
        </div>
      </div>

      {/* URL Form Container */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        <UrlForm/>
      </div>
      
      {/* Call to Action Section */}
      <div className="text-center">
        <p className="text-gray-400 mb-4 text-lg">
          Want to create custom url and view analytics?
        </p>
        <Link 
          to="/auth" 
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 text-lg"
        >
          Sign Up for Free
        </Link>
      </div>
    </div>
  )
}