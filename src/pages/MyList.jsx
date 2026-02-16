// My List Page - displays user's saved movies
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TrailerModal from "../components/TrailerModal";
import useMyList from "../hooks/useMyList";
import { getImageUrl } from "../services/tmdb";
import { FaPlay, FaCheck, FaTimes } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { motion, AnimatePresence } from "framer-motion";

const MyList = () => {
  const { myList, loading, isInMyList, toggleMyList } = useMyList();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-netflix-black min-h-screen"
    >
      <Navbar />

      <div className="pt-24 px-4 md:px-12 pb-16">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-8">
          My List
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                height={280}
                baseColor="#2F2F2F"
                highlightColor="#444"
                className="rounded-sm"
              />
            ))}
          </div>
        )}

        {/* Movie Grid */}
        {!loading && myList.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            <AnimatePresence>
              {myList.map((movie) => {
                const title = movie.title || movie.name || movie.original_name;

                return (
                  <motion.div
                    key={movie.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="group cursor-pointer relative"
                    onClick={() => {
                      setSelectedMovie(movie);
                      setShowTrailer(true);
                    }}
                  >
                    <div className="relative overflow-hidden rounded-sm">
                      <img
                        src={getImageUrl(movie.poster_path, "w342")}
                        alt={title}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex items-center gap-2">
                          <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                            <FaPlay className="text-netflix-black text-sm ml-0.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMyList(movie);
                            }}
                            className="w-10 h-10 rounded-full bg-netflix-dark/80 border-2 border-white/70 flex items-center justify-center hover:border-red-500 transition-colors"
                            title="Remove from My List"
                          >
                            <FaTimes className="text-white text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-netflix-text text-sm mt-2 truncate group-hover:text-white transition-colors">
                      {title}
                    </h3>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && myList.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-white text-xl font-semibold mb-2">
              Your list is empty
            </h2>
            <p className="text-netflix-light-gray text-sm max-w-md mx-auto">
              Add movies and TV shows to your list so you can easily find them
              later. Browse the home page and click the + button on any title to
              get started.
            </p>
          </div>
        )}
      </div>

      <Footer />

      {/* Trailer Modal */}
      <TrailerModal
        movie={selectedMovie}
        isOpen={showTrailer}
        onClose={() => {
          setShowTrailer(false);
          setSelectedMovie(null);
        }}
        isInMyList={selectedMovie ? isInMyList(selectedMovie.id) : false}
        onToggleMyList={toggleMyList}
      />
    </motion.div>
  );
};

export default MyList;
