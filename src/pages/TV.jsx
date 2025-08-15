import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularTV } from "../slices/moviesSlice";
import { IMG_BASE_PATH, URLs } from "../url";
import { Link } from "react-router-dom";

function TV() {
  const dispatch = useDispatch();
  const { popularTV, loading, error } = useSelector((state) => state.movieReducer);

  useEffect(() => {
    dispatch(fetchPopularTV(URLs.popularTV));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#04152d'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-amber-400 mx-auto mb-4"></div>
          <div className="text-white text-xl font-medium">Loading Popular TV Shows...</div>
        </div>
      </div>
    );
  }

  if (error || !popularTV?.results) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#04152d'}}>
        <div className="text-center">
          <div className="text-6xl text-red-500 mb-4">📺</div>
          <div className="text-white text-xl">Error: {error || "No data available"}</div>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-14 py-12" style={{backgroundColor: '#04152d'}}>
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-4">
          📺 Popular TV Shows
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-6"></div>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover the most popular TV shows trending right now
        </p>
      </div>

      {/* TV Shows Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {popularTV.results.map((obj, index) => (
          <div 
            key={obj.id} 
            className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-amber-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Rank Badge */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10 shadow-lg">
              {index + 1}
            </div>

            {/* TV Show Poster Container */}
            <div className="relative overflow-hidden rounded-xl mb-4 group-hover:shadow-2xl transition-shadow duration-500">
              <Link to={`/tv/${obj.id}`}>
                <img
                  src={`${IMG_BASE_PATH}${obj.poster_path}`}
                  alt={obj.name}
                  className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x450/6b7280/ffffff?text=TV+Show+Poster";
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

            {/* TV Show Info */}
            <div className="space-y-3">
              <h3 className="text-white text-lg font-bold group-hover:text-amber-300 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                {obj.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                  <p className="text-gray-300 text-sm font-medium">
                    {obj.first_air_date ? new Date(obj.first_air_date).getFullYear() : "N/A"}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-500/20 backdrop-blur-sm rounded-full px-2 py-1 border border-blue-500/30">
                    <span className="text-blue-400 text-xs font-semibold">TV</span>
                  </div>
                  <div className="bg-purple-500/20 backdrop-blur-sm rounded-full px-2 py-1 border border-purple-500/30">
                    <span className="text-purple-400 text-xs font-semibold">HOT</span>
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

      {/* Bottom Decoration */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
          <span className="text-amber-400 text-lg">📺</span>
          <span className="text-gray-300 font-medium">
            Showing {popularTV.results.length} popular TV shows
          </span>
          <span className="text-amber-400 text-lg">🎬</span>
        </div>
      </div>
    </section>
  );
}

export default TV;