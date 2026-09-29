// Search Page - search results display
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TrailerModal from "../components/TrailerModal";
import MovieCard from "../components/MovieCard";
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
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start">
            {results.map((movie) => (
              <div key={movie.id} className="mb-8">
                <MovieCard
                  movie={movie}
                  onPlayTrailer={(m) => {
                    setSelectedMovie(m);
                    setShowTrailer(true);
                  }}
                  onMoreInfo={(m) => {
                    setSelectedMovie(m);
                    setShowTrailer(true);
                  }}
                  isInMyList={isInMyList(movie.id)}
                  onToggleMyList={toggleMyList}
                />
              </div>
            ))}
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
