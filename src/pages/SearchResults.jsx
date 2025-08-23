
import { useSelector } from "react-redux";
import { IMG_BASE_PATH } from "../url";
import { Link } from "react-router-dom";
import { useState } from "react";

function SearchResults() {
  const { searchResults, searchTerm, loading, error } = useSelector((state) => state.movieReducer);
  const [startIndex, setStartIndex] = useState(0);

  // Filter for movie results only
  const movieResults = searchResults?.results?.filter(
    (item) => item.media_type === "movie" && item.poster_path
  ) || [];

  const handleNext = () => {
    if (movieResults.length > startIndex + 5) {
      setStartIndex((prev) => prev + 5);
    } else {
      setStartIndex(0);
    }
  };

  if (!searchTerm.trim()) {
    return (
      <section className="px-4 sm:px-6 lg:px-14 py-12" style={{ backgroundColor: '#04152d' }}>
        <div className="text-center">
          <div className="text-white text-lg font-medium">
            Enter a search term to see movie results
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="px-4 sm:px-6 lg:px-14 py-12" style={{ backgroundColor: '#04152d' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400 mx-auto mb-4"></div>
          <div className="text-white text-lg font-medium">Searching for "{searchTerm}"...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 sm:px-6 lg:px-14 py-12" style={{ backgroundColor: '#04152d' }}>
        <div className="text-center">
          <div className="text-4xl text-red-500 mb-4">⚠️</div>
          <div className="text-white text-lg">Error: {error}</div>
        </div>
      </section>
    );
  }

  if (movieResults.length === 0) {
    return (
      <section className="px-4 sm:px-6 lg:px-14 py-12" style={{ backgroundColor: '#04152d' }}>
        <div className="text-center">
          <div className="text-white text-lg font-medium">
            No movies found for "{searchTerm}"
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-14 py-12" style={{ backgroundColor: '#04152d' }}>
      <header className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-2">
          Search Results for "{searchTerm}"
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
      </header>
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movieResults
            .slice(startIndex, startIndex + 5)
            .map((obj, index) => (
              <div
                key={obj.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-amber-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10 shadow-lg">
                  {startIndex + index + 1}
                </div>
                <div className="relative overflow-hidden rounded-xl mb-4 group-hover:shadow-2xl transition-shadow duration-500">
                  <Link to={`/movie/${obj.id}`}>
                    <img
                      src={IMG_BASE_PATH + obj.poster_path}
                      alt={obj.title}
                      className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x450/6b7280/ffffff?text=Movie+Poster";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white text-sm font-medium mb-2 line-clamp-2">
                          Click to view details
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 border-2 border-amber-400 shadow-lg">
                    <div className="flex items-center space-x-1">
                      <span className="text-amber-400 text-xs">⭐</span>
                      <span className="text-amber-400 text-sm font-bold">
                        {obj.vote_average?.toFixed(1) || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-white text-lg font-bold group-hover:text-amber-300 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                    {obj.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                      <p className="text-gray-300 text-sm font-medium">
                        {obj.release_date
                          ? new Date(obj.release_date).getFullYear()
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-500/20 backdrop-blur-sm rounded-full px-2 py-1 border border-green-500/30">
                        <span className="text-green-400 text-xs font-semibold">MOVIE</span>
                      </div>
                      <div className="bg-purple-500/20 backdrop-blur-sm rounded-full px-2 py-1 border border-purple-500/30">
                        <span className="text-purple-400 text-xs font-semibold">TOP</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-400 text-xs">Popularity</span>
                      <span className="text-amber-400 text-xs font-semibold">
                        {Math.round(obj.popularity) || 0}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-orange-500 h-1.5 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((obj.popularity / 1000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 via-orange-500/0 to-red-500/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-red-500/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
        </div>
        {movieResults.length > 5 && (
          <div className="flex justify-between items-center mt-8">
            <button
              className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-amber-500/25 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
              onClick={() => setStartIndex((prev) => Math.max(prev - 5, 0))}
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex space-x-2">
              {Array.from(
                { length: Math.ceil(movieResults.length / 5) },
                (_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      Math.floor(startIndex / 5) === i ? "bg-amber-400 w-8" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    onClick={() => setStartIndex(i * 5)}
                  />
                )
              )}
            </div>
            <button
              className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-amber-500/25 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
              onClick={handleNext}
            >
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="text-center mt-12">
        <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
          <span className="text-amber-400 text-lg">🎬</span>
          <span className="text-gray-300 font-medium">
            Showing {Math.min(5, movieResults.length)} of {movieResults.length} movies
          </span>
          <span className="text-amber-400 text-lg">✨</span>
        </div>
      </div>
    </section>
  );
}

export default SearchResults;
