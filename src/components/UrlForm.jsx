import { useState } from "react";
import { useSelector } from "react-redux";
import { createShortUrlApi } from "../apis/shortUrl.api";
import { queryClient } from "../main";

export const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      const shortUrl = await createShortUrlApi(url, customSlug);
      setShortUrl(shortUrl);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
          Enter your URL
        </label>
        <div className="flex rounded-md shadow-sm">
          <input
            type="url"
            id="url"
            value={url}
            onInput={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            required
            className="flex-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-l-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="inline-flex items-center px-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-r-md hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          >
            Shorten
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-900/30 text-red-300 rounded-md border border-red-700/50">
          {error}
        </div>
      )}

      {isAuthenticated && (
        <div>
          <label htmlFor="customSlug" className="block text-sm font-medium text-gray-300 mb-2">
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="Enter custom slug"
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
      )}

      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-200 mb-3">Your shortened URL:</h2>
          <div className="flex rounded-md shadow-sm">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-l-md py-2 px-4 truncate"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md transition-all duration-200 ${
                copied
                  ? "bg-green-600 text-white"
                  : "bg-gray-600 text-gray-200 hover:bg-gray-500"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};