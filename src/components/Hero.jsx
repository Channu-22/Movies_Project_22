function Hero() {
  return (
    <div
      className="hero min-h-[90dvh] flex justify-center items-center text-white relative bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Content Container */}
      <div className="max-w-[800px] text-center px-4">
        <h1 className="text-[70px] md:text-[90px] font-extrabold leading-tight drop-shadow-lg">
          Welcome.
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mt-3">
          Millions of movies, TV shows, and people to discover.{" "}
          <span className="text-[#f89e00] font-semibold">Explore now.</span>
        </p>

        {/* Search Bar */}
        <div className="flex items-center w-full mt-8 shadow-lg rounded-full overflow-hidden backdrop-blur-sm">
          <input
            className="w-[75%] md:w-[80%] h-[60px] px-6 bg-white text-black outline-none text-lg"
            type="text"
            placeholder="Search for a movie or TV show..."
          />
          <button
            className="w-[25%] md:w-[20%] h-[60px] bg-gradient-to-r from-[#f89e00] to-[#da2f68] hover:scale-105 transition-transform duration-300 text-lg font-semibold"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
