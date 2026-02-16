// MovieRow - horizontal scrollable row of movies with category title
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";
import useMovies from "../hooks/useMovies";
import Skeleton from "react-loading-skeleton";

const MovieRow = ({
  title,
  fetchUrl,
  isLargeRow = false,
  onPlayTrailer,
  onMoreInfo,
  isInMyList,
  onToggleMyList,
}) => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const { movies, loading } = useMovies(fetchUrl);

  // Scroll the row left or right
  const handleScroll = (direction) => {
    const container = rowRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.85;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  };

  // Update arrow visibility based on scroll position
  const handleScrollUpdate = () => {
    const container = rowRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 20);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 20,
    );
  };

  // Loading skeleton for the row
  if (loading) {
    return (
      <div className="px-4 md:px-12 mb-6">
        <h2 className="text-white text-lg md:text-xl font-bold mb-3">
          <Skeleton width={200} baseColor="#2F2F2F" highlightColor="#444" />
        </h2>
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton
              key={i}
              width={isLargeRow ? 170 : 240}
              height={isLargeRow ? 250 : 135}
              baseColor="#2F2F2F"
              highlightColor="#444"
              className="flex-shrink-0 rounded-sm"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-6 md:mb-8 group/row">
      {/* Row Title */}
      <h2 className="text-white text-lg md:text-xl font-bold mb-2 md:mb-3 px-4 md:px-12 hover:text-netflix-text transition-colors cursor-pointer">
        {title}
        <span className="text-xs text-netflix-red ml-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
          Explore All →
        </span>
      </h2>

      {/* Scrollable Container */}
      <div className="relative group/slider">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-0 bottom-0 z-40 w-12 md:w-14 bg-black/60 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-300"
          >
            <FaChevronLeft className="text-white text-xl" />
          </button>
        )}

        {/* Movie Cards */}
        <div
          ref={rowRef}
          onScroll={handleScrollUpdate}
          className="flex gap-1.5 md:gap-2 overflow-x-scroll scrollbar-hide pl-4 md:pl-12 pr-4 py-6"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isLargeRow={isLargeRow}
              onPlayTrailer={onPlayTrailer}
              onMoreInfo={onMoreInfo}
              isInMyList={isInMyList ? isInMyList(movie.id) : false}
              onToggleMyList={onToggleMyList}
            />
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-0 bottom-0 z-40 w-12 md:w-14 bg-black/60 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-300"
          >
            <FaChevronRight className="text-white text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRow;
