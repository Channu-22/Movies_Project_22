import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleData } from "../slices/moviesSlice";
import { IMG_BASE_PATH } from "../url";
import { useParams } from "react-router-dom";

function Single() {
  const { id } = useParams(); // Get id from URL (e.g., /movie/123 or /tv/456)
  const dispatch = useDispatch();
  const { singleMovie, loading, error } = useSelector((state) => state.movieReducer);
  const [castStartIndex, setCastStartIndex] = useState(0); // Track starting index for cast carousel

  useEffect(() => {
    const type = window.location.pathname.includes("/movie") ? "movie" : "tv";
    if (id) {
      dispatch(fetchSingleData([type, id]));
    }
  }, [dispatch, id]);

  // Handle clicking the next button for cast carousel
  const handleNextCast = () => {
    if (singleMovie?.credits?.cast?.length > castStartIndex + 10) {
      setCastStartIndex((prev) => prev + 5);
    } else {
      setCastStartIndex(0); // Reset to start if at the end
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#04152d'}}>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  if (error || !singleMovie) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#04152d'}}>
        <div className="text-center">
          <div className="text-6xl text-red-500 mb-4">⚠</div>
          <div className="text-white text-xl">Error: {error || "No data available"}</div>
        </div>
      </div>
    );
  }

  const {
    poster_path,
    title,
    name,
    genres,
    vote_average,
    overview,
    release_date,
    first_air_date,
    credits,
    status,
    runtime,
    popularity,
    revenue,
  } = singleMovie;

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-14 py-8" style={{backgroundColor: '#04152d'}}>
      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-16">
        {/* Left Side: Poster */}
        <div className="relative w-full lg:w-1/3 group">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
            <img
              src={`${IMG_BASE_PATH}${poster_path}`}
              alt={title || name}
              className="w-full h-auto transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center shadow-2xl ring-4 ring-white/20">
            <p className="text-white text-lg font-bold">{vote_average?.toFixed(1) || "N/A"}</p>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 leading-tight">
              {title || name}
            </h1>
            
            <div className="flex flex-wrap gap-2">
              {genres?.map((g, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 rounded-full text-sm font-medium border border-purple-500/30 backdrop-blur-sm"
                >
                  {g.name}
                </span>
              )) || <span className="text-gray-400">No genres available</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Release Date</span>
              <p className="text-white text-lg font-medium mt-1">{release_date || first_air_date || "N/A"}</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Rating</span>
              <p className="text-white text-lg font-medium mt-1">{vote_average?.toFixed(1) || "N/A"}/10</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Status</span>
              <p className="text-white text-lg font-medium mt-1">{status || "N/A"}</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Runtime</span>
              <p className="text-white text-lg font-medium mt-1">{runtime ? `${runtime} min` : "N/A"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Popularity</span>
              <p className="text-white text-lg font-medium mt-1">{popularity?.toFixed(1) || "N/A"}</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Revenue</span>
              <p className="text-white text-lg font-medium mt-1">
                {revenue ? `${(revenue / 1000000).toFixed(1)}M` : "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Overview</h3>
            <p className="text-gray-200 text-lg leading-relaxed">{overview || "No overview available"}</p>
          </div>
        </div>
      </div>

      {/* Top Cast Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            ✨ Top Cast
          </h2>
          <div className="hidden sm:block w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
        </div>
        
        <div className="relative">
          {/* Cast Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {credits?.cast?.slice(castStartIndex, castStartIndex + 12)?.map((actor, index) => (
              <div
                key={actor.id}
                className="group flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-amber-400/50 group-hover:ring-amber-400 transition-all duration-300">
                    <img
                      src={
                        actor.profile_path
                          ? `${IMG_BASE_PATH}${actor.profile_path}`
                          : "https://via.placeholder.com/150x150/6b7280/ffffff?text=No+Image"
                      }
                      alt={actor.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150x150/6b7280/ffffff?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index + 1}
                  </div>
                </div>
                
                <div className="text-center space-y-1">
                  <p className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                    {actor.name}
                  </p>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-1">
                    {actor.character}
                  </p>
                </div>
              </div>
            )) || (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🎭</div>
                <p className="text-gray-400 text-lg">No cast information available</p>
              </div>
            )}
          </div>

          {/* Navigation Button */}
          {credits?.cast?.length > 12 && (
            <button
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-2xl hover:shadow-amber-500/25 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
              onClick={handleNextCast}
            >
              <svg 
                className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Cast Navigation Dots */}
        {credits?.cast?.length > 12 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil((credits?.cast?.length || 0) / 5) }, (_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(castStartIndex / 5) === i
                    ? 'bg-amber-400 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => setCastStartIndex(i * 5)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Single;