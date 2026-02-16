// TrailerModal - displays movie trailer in a modal overlay
import { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaCheck, FaPlay, FaThumbsUp } from "react-icons/fa";
import YouTube from "react-youtube";
import { fetchMovieVideos, getBackdropUrl } from "../services/tmdb";
import { motion, AnimatePresence } from "framer-motion";

const TrailerModal = ({
  movie,
  isOpen,
  onClose,
  isInMyList,
  onToggleMyList,
}) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch trailer when modal opens
  useEffect(() => {
    if (!isOpen || !movie) return;

    const loadTrailer = async () => {
      setLoading(true);
      const mediaType =
        movie.media_type || (movie.first_air_date ? "tv" : "movie");
      const videos = await fetchMovieVideos(movie.id, mediaType);

      // Prefer official trailers, then teasers, then any video
      const trailer =
        videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
        videos.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
        videos.find((v) => v.site === "YouTube");

      setTrailerKey(trailer?.key || null);
      setLoading(false);
    };

    loadTrailer();
  }, [isOpen, movie]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!movie) return null;

  const title = movie.title || movie.name || movie.original_name;

  // YouTube player options
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-8 md:pt-16 px-4 modal-backdrop overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-netflix-dark rounded-lg overflow-hidden shadow-2xl mb-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-50 w-9 h-9 rounded-full bg-netflix-dark/80 flex items-center justify-center hover:bg-netflix-gray transition-colors"
            >
              <FaTimes className="text-white text-sm" />
            </button>

            {/* Video / Backdrop Section */}
            <div className="relative w-full aspect-video bg-black">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin" />
                </div>
              ) : trailerKey ? (
                <YouTube
                  videoId={trailerKey}
                  opts={opts}
                  className="w-full h-full"
                  iframeClassName="w-full h-full"
                />
              ) : (
                <div
                  className="w-full h-full bg-cover bg-center flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})`,
                  }}
                >
                  <p className="text-white text-lg bg-black/50 px-4 py-2 rounded">
                    No trailer available
                  </p>
                </div>
              )}

              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-netflix-dark to-transparent" />
            </div>

            {/* Movie Details */}
            <div className="p-5 md:p-8">
              {/* Title and Actions */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                    {title}
                  </h2>
                  <div className="flex items-center gap-3 text-sm">
                    {movie.vote_average > 0 && (
                      <span className="text-green-400 font-bold">
                        {Math.round(movie.vote_average * 10)}% Match
                      </span>
                    )}
                    <span className="text-netflix-light-gray">
                      {movie.release_date?.split("-")[0] ||
                        movie.first_air_date?.split("-")[0]}
                    </span>
                    <span className="border border-netflix-light-gray text-netflix-light-gray px-1.5 py-0.5 text-xs rounded">
                      HD
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleMyList && onToggleMyList(movie)}
                    className="w-10 h-10 rounded-full border-2 border-netflix-light-gray flex items-center justify-center hover:border-white transition-colors"
                    title={
                      isInMyList ? "Remove from My List" : "Add to My List"
                    }
                  >
                    {isInMyList ? (
                      <FaCheck className="text-white text-sm" />
                    ) : (
                      <FaPlus className="text-white text-sm" />
                    )}
                  </button>
                  <button className="w-10 h-10 rounded-full border-2 border-netflix-light-gray flex items-center justify-center hover:border-white transition-colors">
                    <FaThumbsUp className="text-white text-sm" />
                  </button>
                </div>
              </div>

              {/* Overview */}
              <p className="text-netflix-text text-sm md:text-base leading-relaxed">
                {movie.overview || "No description available."}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrailerModal;
