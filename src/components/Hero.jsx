
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchTerm, searchData } from "../slices/moviesSlice";
// import { URLs, IMG_BASE_PATH } from "../url";
// import "../main.css"

// function Hero() {
//   const { searchTerm, searchResults } = useSelector((state) => state.movieReducer);
//   const dispatch = useDispatch();
//   const [debounceTimeout, setDebounceTimeout] = useState(null);
//   const [localInput, setLocalInput] = useState(searchTerm); // Fallback local state

//   // Sync localInput with searchTerm
//   useEffect(() => {
//     setLocalInput(searchTerm);
//   }, [searchTerm]);

//   // Handle search input with debounce
//   const handleSearch = (value) => {
//     // console.log("Input Value:", value); // Debug: Check input value
//     setLocalInput(value); // Update local state
//     dispatch(setSearchTerm(value)); // Update Redux state
//     console.log("Dispatched setSearchTerm with:", value); // Debug: Confirm dispatch
//     if (debounceTimeout) {
//       clearTimeout(debounceTimeout);
//     }
//     if (value.trim().length > 2) {
//       const timeout = setTimeout(() => {
//         console.log("Triggering search for:", value); // Debug: Confirm search
//         dispatch(searchData({ url: URLs.search, query: value }));
//       }, 500);
//       setDebounceTimeout(timeout);
//     } else {
//       dispatch(setSearchTerm(""));
//     }
//   };

//   // Filter for movie results only
//   const movieResults = searchResults?.results?.filter(
//     (item) => item.media_type === "movie" && item.backdrop_path
//   ) || [];

//   // Get background image (first movie result or dummy)
//   const backgroundImage = movieResults.length > 0
//     ? `${IMG_BASE_PATH}${movieResults[0].backdrop_path}`
//     : "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2uw.jpg"; // Dummy TMDB backdrop (The Matrix)

//   console.log("Current searchTerm:", searchTerm); // Debug: Check Redux state
//   console.log("Current localInput:", localInput); // Debug: Check local state
//   console.log("Movie Results:", movieResults); // Debug: Check filtered results

//   return (
//     <div
//       className="hero min-h-[90dvh] flex justify-center items-center text-white relative bg-cover bg-center transition-all duration-500"
//       style={{
//         backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${backgroundImage})`,
//       }}
//     >
//       <div className="max-w-[800px] text-center px-4">
//         <h1 className="text-[50px] sm:text-[70px] md:text-[90px] font-extrabold leading-tight">
//           Welcome.
//         </h1>
//         <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mt-3">
//           Millions of movies, TV shows, and people to discover.{" "}
//           <span className="text-amber-400 font-semibold">Explore now.</span>
//         </p>
//         <div className="flex items-center w-full mt-6 rounded-full overflow-hidden">
//           <input
//             className="w-[75%] sm:w-[80%] h-[50px] sm:h-[60px] px-6 bg-white text-black outline-none text-base sm:text-lg rounded-l-full"
//             type="text"
//             placeholder="Search for a movie or TV show..."
//             value={localInput} // Use localInput as fallback
//             onChange={(e) => handleSearch(e.target.value)}
//           />
//           <button
//             className="w-[25%] sm:w-[20%] h-[50px] sm:h-[60px] bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold rounded-r-full transition-transform duration-300 hover:scale-105"
//             onClick={() => {
//               if (localInput.trim().length > 2) {
//                 console.log("Button Search:", localInput); // Debug: Confirm button click
//                 dispatch(searchData({ url: URLs.search, query: localInput }));
//               }
//             }}
//           >
//             Search
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero;



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, searchData } from "../slices/moviesSlice";
import { URLs, IMG_BASE_PATH } from "../url";

function Hero() {
  const { searchTerm, searchResults } = useSelector((state) => state.movieReducer);
  const dispatch = useDispatch();
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [localInput, setLocalInput] = useState(searchTerm);

  useEffect(() => {
    setLocalInput(searchTerm);
  }, [searchTerm]);

  const handleSearch = (value) => {
    console.log("Input Value:", value);
    setLocalInput(value);
    dispatch(setSearchTerm(value));
    console.log("Dispatched setSearchTerm with:", value);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    if (value.trim().length > 2) {
      const timeout = setTimeout(() => {
        console.log("Triggering search for:", value);
        dispatch(searchData({ url: URLs.search, query: value }));
      }, 500);
      setDebounceTimeout(timeout);
    } else {
      dispatch(setSearchTerm(""));
    }
  };

  const movieResults = searchResults?.results?.filter(
    (item) => item.media_type === "movie" && item.backdrop_path
  ) || [];

  const backgroundImage = movieResults.length > 0
    ? `${IMG_BASE_PATH}${movieResults[0].backdrop_path}`
    : "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2uw.jpg";

  console.log("Current searchTerm:", searchTerm);
  console.log("Current localInput:", localInput);
  console.log("Movie Results:", movieResults);

  return (
    <div
      className="hero min-h-[90dvh] flex justify-center items-center text-white relative bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${backgroundImage})`,
      }}
    >
      <div className="max-w-[800px] text-center px-4">
        <h1 className="text-[50px] sm:text-[70px] md:text-[90px] font-extrabold leading-tight">
          Welcome.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mt-3">
          Millions of movies, TV shows, and people to discover.{" "}
          <span className="text-amber-400 font-semibold">Explore now.</span>
        </p>
        <div className="flex items-center w-full mt-6 rounded-full overflow-hidden">
          <input
            className="w-[75%] sm:w-[80%] h-[50px] sm:h-[60px] px-6 bg-white text-black outline-none text-base sm:text-lg rounded-l-full border-2 "
            type="text"
            placeholder="Search for a movie or TV show..."
            value={localInput}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            className="w-[25%] sm:w-[20%] h-[50px] sm:h-[60px] bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold rounded-r-full transition-transform duration-300 hover:scale-105"
            onClick={() => {
              if (localInput.trim().length > 2) {
                console.log("Button Search:", localInput);
                dispatch(searchData({ url: URLs.search, query: localInput }));
              }
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
