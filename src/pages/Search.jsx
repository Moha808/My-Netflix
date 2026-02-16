// Search Page - search results display
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TrailerModal from "../components/TrailerModal";
import { searchMovies, getImageUrl } from "../services/tmdb";
import useMyList from "../hooks/useMyList";
import Skeleton from "react-loading-skeleton";
import { FaPlay, FaPlus, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const { isInMyList, toggleMyList } = useMyList();

  // Fetch search results when query changes
  useEffect(() => {
    const doSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      const data = await searchMovies(query);
      // Filter to only movies and TV shows with images
      setResults(
        data.filter(
          (item) =>
            item.poster_path &&
            (item.media_type === "movie" || item.media_type === "tv"),
        ),
      );
      setLoading(false);
    };
    doSearch();
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-netflix-black min-h-screen"
    >
      <Navbar />

      <div className="pt-24 px-4 md:px-12 pb-16">
        {/* Search Header */}
        <h1 className="text-white text-xl md:text-2xl font-medium mb-6">
          {query ? (
            <>
              Search results for:{" "}
              <span className="font-bold">&quot;{query}&quot;</span>
            </>
          ) : (
            "Search for movies & TV shows"
          )}
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
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

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {results.map((movie) => {
              const title = movie.title || movie.name || movie.original_name;
              const inList = isInMyList(movie.id);

              return (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
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
                          className="w-10 h-10 rounded-full border-2 border-white/70 flex items-center justify-center hover:border-white transition-colors"
                        >
                          {inList ? (
                            <FaCheck className="text-white text-sm" />
                          ) : (
                            <FaPlus className="text-white text-sm" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-netflix-text text-sm mt-2 truncate group-hover:text-white transition-colors">
                    {title}
                  </h3>

                  {/* Rating */}
                  {movie.vote_average > 0 && (
                    <p className="text-green-400 text-xs font-bold mt-0.5">
                      {Math.round(movie.vote_average * 10)}% Match
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* No Results */}
        {!loading && query && results.length === 0 && (
          <div className="text-center py-20">
            <p className="text-netflix-light-gray text-lg mb-2">
              No results found for &quot;{query}&quot;
            </p>
            <p className="text-netflix-light-gray text-sm">
              Try different keywords or browse our categories.
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

export default Search;
