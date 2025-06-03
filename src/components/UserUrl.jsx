import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUserUrlsApi, deleteUrlApi } from "../apis/user.api";
import { useState } from "react";
import toast from 'react-hot-toast';

export const UserUrl = () => {
  const queryClient = useQueryClient();
  const [copiedId, setCopiedId] = useState(null);

  const {
    data: urls,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrlsApi,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUrlApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      toast.success('URL deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete URL');
    }
  });

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('URL copied to clipboard');
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleDelete = (urlId) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      deleteMutation.mutate(urlId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-900/30 border border-red-700/50 text-red-300 px-4 py-3 rounded my-4">
        Error loading your URLs: {error.message}
      </div>
    );
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-gray-400 my-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <svg
          className="w-12 h-12 mx-auto text-gray-500 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
        <p className="text-lg font-medium text-gray-300">No URLs found</p>
        <p className="mt-1">You haven't created any shortened URLs yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg mt-6 shadow-xl overflow-hidden border border-gray-700">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Original URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Short URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Clicks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {urls.urls.slice().reverse().map((url) => {
              const fullShortUrl = `${import.meta.env.VITE_BACKEND_URL.replace(/\/?$/, '/')}${url.short_url}`;
              return (
                <tr key={url._id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300 truncate max-w-xs">{url.full_url}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <a
                        href={fullShortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                      >
                        {fullShortUrl}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900/50 text-blue-300">
                      {url.clicks} {url.clicks === 1 ? "click" : "clicks"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                    <button
                      onClick={() => handleCopy(fullShortUrl, url._id)}
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm ${
                        copiedId === url._id
                          ? "bg-green-600 text-white"
                          : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                      } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors`}
                    >
                      {copiedId === url._id ? (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(url._id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm bg-red-900/50 text-red-300 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                      disabled={deleteMutation.isLoading}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
