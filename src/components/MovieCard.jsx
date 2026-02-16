// MovieCard - individual movie card with Netflix-style hover effect
import { useState } from "react";
import { FaPlay, FaPlus, FaCheck, FaChevronDown } from "react-icons/fa";
import { getImageUrl } from "../services/tmdb";

const MovieCard = ({
  movie,
  isLargeRow = false,
  onPlayTrailer,
  onMoreInfo,
  isInMyList,
  onToggleMyList,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const title = movie.title || movie.name || movie.original_name || "";
  const imageUrl = isLargeRow
    ? getImageUrl(movie.poster_path, "w342")
    : getImageUrl(movie.backdrop_path || movie.poster_path, "w300");

  if (!imageUrl) return null;

  return (
    <div
      className="relative flex-shrink-0 cursor-pointer group"
      style={{ width: isLargeRow ? "170px" : "240px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster/Backdrop Image */}
      <img
        src={imageUrl}
        alt={title}
        className={`w-full object-cover rounded-sm transition-all duration-300 ${
          isLargeRow ? "h-[250px]" : "h-[135px]"
        } ${isHovered ? "rounded-t-md rounded-b-none" : ""}`}
        loading="lazy"
      />

      {/* Hover Overlay - Netflix-style expanded card */}
      {isHovered && (
        <div className="absolute left-0 right-0 top-full bg-netflix-dark rounded-b-md shadow-2xl z-50 p-3 transform origin-top animate-in">
          {/* Title */}
          <h3 className="text-white text-xs font-bold mb-2 truncate">
            {title}
          </h3>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mb-2">
            {/* Play Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayTrailer && onPlayTrailer(movie);
              }}
              className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-white/80 transition-colors"
            >
              <FaPlay className="text-netflix-black text-[10px] ml-0.5" />
            </button>

            {/* Add/Remove from My List */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleMyList && onToggleMyList(movie);
              }}
              className="w-7 h-7 rounded-full border-2 border-netflix-light-gray flex items-center justify-center hover:border-white transition-colors"
            >
              {isInMyList ? (
                <FaCheck className="text-white text-[10px]" />
              ) : (
                <FaPlus className="text-white text-[10px]" />
              )}
            </button>

            {/* More Info Button (pushed to right) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoreInfo && onMoreInfo(movie);
              }}
              className="w-7 h-7 rounded-full border-2 border-netflix-light-gray flex items-center justify-center hover:border-white transition-colors ml-auto"
            >
              <FaChevronDown className="text-white text-[10px]" />
            </button>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-2 text-xs">
            {movie.vote_average > 0 && (
              <span className="text-green-400 font-bold">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
            )}
            <span className="text-netflix-light-gray">
              {movie.release_date?.split("-")[0] ||
                movie.first_air_date?.split("-")[0]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
