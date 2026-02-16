// Hero Banner - large cinematic banner with movie info and trailer
import { useState, useEffect } from "react";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { getBackdropUrl } from "../services/tmdb";
import useMovies from "../hooks/useMovies";
import requests from "../services/tmdb";
import Skeleton from "react-loading-skeleton";

const HeroBanner = ({ onPlayTrailer, onMoreInfo }) => {
  const { movies, loading } = useMovies(requests.fetchNetflixOriginals);
  const [movie, setMovie] = useState(null);

  // Pick a random featured movie on load
  useEffect(() => {
    if (movies.length > 0) {
      setMovie(movies[Math.floor(Math.random() * movies.length)]);
    }
  }, [movies]);

  if (loading || !movie) {
    return (
      <div className="relative w-full h-[56.25vw] max-h-[80vh] min-h-[400px]">
        <Skeleton height="100%" baseColor="#2F2F2F" highlightColor="#444" />
      </div>
    );
  }

  const title = movie.title || movie.name || movie.original_name;
  const description = movie.overview
    ? movie.overview.length > 200
      ? movie.overview.substring(0, 200) + "..."
      : movie.overview
    : "";

  return (
    <header
      className="relative w-full h-[56.25vw] max-h-[80vh] min-h-[400px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})`,
      }}
    >
      {/* Gradient Overlays */}
      <div className="absolute inset-0 hero-gradient-left" />
      <div className="absolute bottom-0 left-0 right-0 h-[40%] hero-gradient-bottom" />

      {/* Content */}
      <div className="absolute bottom-[25%] md:bottom-[30%] left-4 md:left-12 max-w-lg md:max-w-xl z-10">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 md:mb-4 drop-shadow-lg leading-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="text-sm md:text-base text-netflix-text mb-4 md:mb-6 leading-relaxed drop-shadow-md hidden sm:block">
          {description}
        </p>

        {/* Rating Badge */}
        {movie.vote_average > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
              {Math.round(movie.vote_average * 10)}% Match
            </span>
            <span className="text-netflix-light-gray text-xs">
              {movie.release_date?.split("-")[0] ||
                movie.first_air_date?.split("-")[0]}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onPlayTrailer && onPlayTrailer(movie)}
            className="flex items-center gap-2 bg-white text-netflix-black font-bold px-5 md:px-8 py-2 md:py-3 rounded text-sm md:text-base hover:bg-white/80 transition-all duration-300 active:scale-95"
          >
            <FaPlay className="text-sm" />
            Play
          </button>
          <button
            onClick={() => onMoreInfo && onMoreInfo(movie)}
            className="flex items-center gap-2 bg-gray-500/70 text-white font-bold px-5 md:px-8 py-2 md:py-3 rounded text-sm md:text-base hover:bg-gray-500/50 transition-all duration-300 active:scale-95"
          >
            <FaInfoCircle className="text-lg" />
            More Info
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroBanner;
