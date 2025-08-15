import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../slices/moviesSlice";
import { useEffect, useState } from "react";
import { IMG_BASE_PATH } from "../url";
import { Link } from "react-router-dom";

function Row({ heading, tab, url }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.movieReducer);
  const [displayedIndex, setDisplayedIndex] = useState(0);

  //// TRACK STARTING INDEX FOR PAGINATION
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchData({ urls: url, key: heading }));
  }, [dispatch, url, heading]);

  //GET DATA SPECIFIC TO THIS ROW'S HEADING Get
  const movies = data[heading] || [];

  // HANDEL CLICKING THE NEXT BUTTON
  const handleNext = () => {
    if (movies[displayedIndex]?.results?.length > startIndex + 5) {
      setStartIndex((prev) => prev + 5);
    } else {
      setStartIndex(0); // Reset to start if at the end
    }
  };

  if (loading) {
    return (
      <section className="px-4 sm:px-6 lg:px-14 py-12" style={{backgroundColor: '#04152d'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400 mx-auto mb-4"></div>
          <div className="text-white text-lg font-medium">Loading {heading}...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 sm:px-6 lg:px-14 py-12" style={{backgroundColor: '#04152d'}}>
        <div className="text-center">
          <div className="text-4xl text-red-500 mb-4">⚠️</div>
          <div className="text-white text-lg">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-14 py-12" style={{backgroundColor: '#04152d'}}>
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-2">
            {heading}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
          {/* Tab Buttons */}
          <button
            className={`capitalize px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              displayedIndex === 0 
                ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg transform scale-105" 
                : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
            }`}
            onClick={() => setDisplayedIndex(0)}
          >
            {tab[0]}
          </button>
          <button
            className={`capitalize px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              displayedIndex === 1 
                ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg transform scale-105" 
                : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
            }`}
            onClick={() => setDisplayedIndex(1)}
          >
            {tab[1]}
          </button>
          
          {/* Next Button */}
          <button
            className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-amber-500/25 hover:scale-110 transition-all duration-300 flex items-center justify-center group ml-2"
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
      </header>

      {/* Movies Carousel */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.length > 0 &&
            movies[displayedIndex]?.results
              ?.slice(startIndex, startIndex + 5) // Show only 5 posters
              .map((obj, index) => (
                <div 
                  key={obj.id} 
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-amber-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Rank Badge */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10 shadow-lg">
                    {startIndex + index + 1}
                  </div>

                  {/* Movie/TV Poster Container */}
                  <div className="relative overflow-hidden rounded-xl mb-4 group-hover:shadow-2xl transition-shadow duration-500">
                    <Link
                      to={
                        displayedIndex === 0
                          ? `/movie/${obj.id}`
                          : `/tv/${obj.id}`
                      }
                    >
                      <img
                        src={IMG_BASE_PATH + obj.poster_path}
                        alt={obj.title || obj.name}
                        className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = displayedIndex === 0 
                            ? "https://via.placeholder.com/300x450/6b7280/ffffff?text=Movie+Poster"
                            : "https://via.placeholder.com/300x450/6b7280/ffffff?text=TV+Show+Poster";
                        }}
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="text-white text-sm font-medium mb-2 line-clamp-2">
                            Click to view details
                          </div>
                        </div>
                      </div>
                    </Link>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 border-2 border-amber-400 shadow-lg">
                      <div className="flex items-center space-x-1">
                        <span className="text-amber-400 text-xs">⭐</span>
                        <span className="text-amber-400 text-sm font-bold">
                          {obj.vote_average?.toFixed(1) || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Movie/TV Info */}
                  <div className="space-y-3">
                    <h3 className="text-white text-lg font-bold group-hover:text-amber-300 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                      {obj.title || obj.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                        <p className="text-gray-300 text-sm font-medium">
                          {(obj.release_date || obj.first_air_date) 
                            ? new Date(obj.release_date || obj.first_air_date).getFullYear() 
                            : "N/A"}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`backdrop-blur-sm rounded-full px-2 py-1 border ${
                          displayedIndex === 0 
                            ? "bg-green-500/20 border-green-500/30" 
                            : "bg-blue-500/20 border-blue-500/30"
                        }`}>
                          <span className={`text-xs font-semibold ${
                            displayedIndex === 0 ? "text-green-400" : "text-blue-400"
                          }`}>
                            {displayedIndex === 0 ? "MOVIE" : "TV"}
                          </span>
                        </div>
                        <div className="bg-purple-500/20 backdrop-blur-sm rounded-full px-2 py-1 border border-purple-500/30">
                          <span className="text-purple-400 text-xs font-semibold">TOP</span>
                        </div>
                      </div>
                    </div>

                    {/* Popularity Indicator */}
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
                          style={{
                            width: `${Math.min((obj.popularity / 1000) * 100, 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 via-orange-500/0 to-red-500/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-red-500/5 transition-all duration-500 pointer-events-none"></div>
                </div>
              ))}
        </div>

        {/* Pagination Dots */}
        {movies[displayedIndex]?.results?.length > 5 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ 
              length: Math.ceil((movies[displayedIndex]?.results?.length || 0) / 5) 
            }, (_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(startIndex / 5) === i
                    ? 'bg-amber-400 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => setStartIndex(i * 5)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="text-center mt-12">
        <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
          <span className="text-amber-400 text-lg">
            {displayedIndex === 0 ? "🎬" : "📺"}
          </span>
          <span className="text-gray-300 font-medium">
            Showing {Math.min(5, movies[displayedIndex]?.results?.length || 0)} of {movies[displayedIndex]?.results?.length || 0} {displayedIndex === 0 ? "movies" : "TV shows"}
          </span>
          <span className="text-amber-400 text-lg">✨</span>
        </div>
      </div>
    </section>
  );
}

export default Row;