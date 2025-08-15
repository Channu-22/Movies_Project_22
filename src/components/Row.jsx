import { useEffect, useState } from "react";
import { IMG_BASE_PATH } from "../url";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

function Row({ heading, tab, url }) {
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [movieArr, setMovieArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Fetch local data for this row
  useEffect(() => {
    const fetchLocalData = async () => {
      if (Array.isArray(url)) {
        const promises = url.map((endpoint) => axios.get(endpoint));
        const responses = await Promise.all(promises);
        setMovieArr(responses.map((res) => res.data.results));
      }
    };
    fetchLocalData();
  }, [url]);

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < movieArr[displayedIndex]?.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const currentItems = movieArr[displayedIndex]?.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const getRatingColor = (rating) => {
    if (rating >= 8) return "border-green-500 text-green-500 shadow-green-500/50";
    if (rating >= 7) return "border-amber-500 text-amber-500 shadow-amber-500/50";
    if (rating >= 6) return "border-blue-500 text-blue-500 shadow-blue-500/50";
    return "border-red-500 text-red-500 shadow-red-500/50";
  };

  return (
    <section className="px-4 py-8 text-white bg-gray-900 relative sm:px-6 md:px-10 lg:px-12">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
          {heading}
        </h2>
        <div className="flex gap-2 mt-4 sm:mt-0 bg-gray-800 rounded-full p-1.5 sm:p-2 border border-gray-700">
          {tab.map((label, idx) => (
            <button
              key={idx}
              className={`capitalize px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-colors ${
                displayedIndex === idx
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => {
                setDisplayedIndex(idx);
                setCurrentPage(0);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* Carousel */}
      <div className="relative flex items-center">
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="absolute left-0 z-10 bg-gray-800 p-3 sm:p-4 rounded-full disabled:opacity-50 hover:bg-gray-700 transition-transform -ml-6 sm:-ml-8"
        >
          <FaChevronLeft className="text-white text-lg sm:text-xl" />
        </button>

        {/* Movie cards */}
        <div className="flex w-full gap-4 sm:gap-6 md:gap-8 overflow-hidden px-6 sm:px-8">
          {currentItems?.map((obj) => {
            const ratingStyle = getRatingColor(obj.vote_average);
            return (
              <div
                key={obj.id}
                className="w-2/10 flex-shrink-0.5"
              >
                <div className="relative rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
                  <Link
                    to={displayedIndex === 0 ? `/movie/${obj.id}` : `/tv/${obj.id}`}
                    className="block"
                  >
                    <div className="relative aspect-[2/3]">
                      <img
                        src={IMG_BASE_PATH + obj.poster_path}
                        alt={obj.title || obj.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Rating circle */}
                      <div
                        className={`absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 font-bold text-sm sm:text-base bg-gray-900/90 ${ratingStyle}`}
                      >
                        {obj.vote_average.toFixed(1)}
                      </div>
                      {/* Title overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-gray-900/80 to-transparent">
                        <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                          {obj.title || obj.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* Movie info */}
                <div className="mt-4 text-center">
                  <h4 className="text-sm sm:text-base font-semibold text-white truncate">
                    {obj.title || obj.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {obj.release_date
                      ? new Date(obj.release_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Coming Soon"}
                  </p>
                  {/* 5/10 style rating */}
                  <div className="mt-2 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < Math.floor(obj.vote_average / 2)
                            ? "bg-orange-500"
                            : "bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          disabled={
            (currentPage + 1) * itemsPerPage >=
            (movieArr[displayedIndex]?.length || 0)
          }
          className="absolute right-0 z-10 bg-gray-800 p-3 sm:p-4 rounded-full disabled:opacity-50 hover:bg-gray-700 transition-transform -mr-6 sm:-mr-8"
        >
          <FaChevronRight className="text-white text-lg sm:text-xl" />
        </button>
      </div>
    </section>
  );
}

export default Row;