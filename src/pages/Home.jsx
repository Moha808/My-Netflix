// Home Page - main Netflix browse page with hero and movie rows
import { useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import TrailerModal from "../components/TrailerModal";
import Footer from "../components/Footer";
import useMyList from "../hooks/useMyList";
import requests from "../services/tmdb";
import { motion } from "framer-motion";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const { isInMyList, toggleMyList } = useMyList();

  // Open trailer modal for a movie
  const handlePlayTrailer = useCallback((movie) => {
    setSelectedMovie(movie);
    setShowTrailer(true);
  }, []);

  // Open more info / trailer modal
  const handleMoreInfo = useCallback((movie) => {
    setSelectedMovie(movie);
    setShowTrailer(true);
  }, []);

  // Close the trailer modal
  const handleCloseTrailer = useCallback(() => {
    setShowTrailer(false);
    setSelectedMovie(null);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-netflix-black min-h-screen"
    >
      <Navbar />

      {/* Hero Banner */}
      <HeroBanner
        onPlayTrailer={handlePlayTrailer}
        onMoreInfo={handleMoreInfo}
      />

      {/* Movie Rows - pushed up to overlap the hero bottom */}
      <div className="relative -mt-16 md:-mt-24 z-20">
        {/* Netflix Originals - large poster row */}
        <MovieRow
          title="Netflix Originals"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
          onPlayTrailer={handlePlayTrailer}
          onMoreInfo={handleMoreInfo}
          isInMyList={isInMyList}
          onToggleMyList={toggleMyList}
        />

        {/* Trending Now */}
        <MovieRow
          title="Trending Now"
          fetchUrl={requests.fetchTrending}
          onPlayTrailer={handlePlayTrailer}
          onMoreInfo={handleMoreInfo}
          isInMyList={isInMyList}
          onToggleMyList={toggleMyList}
        />

        {/* Top Rated */}
        <MovieRow
          title="Top Rated"
          fetchUrl={requests.fetchTopRated}
          onPlayTrailer={handlePlayTrailer}
          onMoreInfo={handleMoreInfo}
          isInMyList={isInMyList}
          onToggleMyList={toggleMyList}
        />

        {/* Action Movies */}
        <MovieRow
          title="Action Movies"
          fetchUrl={requests.fetchActionMovies}
          onPlayTrailer={handlePlayTrailer}
          onMoreInfo={handleMoreInfo}
          isInMyList={isInMyList}
          onToggleMyList={toggleMyList}
        />

        {/* Comedy Movies */}
        <MovieRow
          title="Comedy Movies"
          fetchUrl={requests.fetchComedyMovies}
          onPlayTrailer={handlePlayTrailer}
          onMoreInfo={handleMoreInfo}
          isInMyList={isInMyList}
          onToggleMyList={toggleMyList}
        />

        {/* Horror Movies */}
        <MovieRow
          title="Horror Movies"
          fetchUrl={requests.fetchHorrorMovies}
          onPlayTrailer={handlePlayTrailer}
          onMoreInfo={handleMoreInfo}
          isInMyList={isInMyList}
          onToggleMyList={toggleMyList}
        />

        {/* Romance Movies */}
        <MovieRow
          title="Romance Movies"
          fetchUrl={requests.fetchRomanceMovies}
          onPlayTrailer={handlePlayTrailer}
          onMoreInfo={handleMoreInfo}
          isInMyList={isInMyList}
          onToggleMyList={toggleMyList}
        />

        {/* Documentaries */}
        <MovieRow
          title="Documentaries"
          fetchUrl={requests.fetchDocumentaries}
          onPlayTrailer={handlePlayTrailer}
          onMoreInfo={handleMoreInfo}
          isInMyList={isInMyList}
          onToggleMyList={toggleMyList}
        />
      </div>

      <Footer />

      {/* Trailer Modal */}
      <TrailerModal
        movie={selectedMovie}
        isOpen={showTrailer}
        onClose={handleCloseTrailer}
        isInMyList={selectedMovie ? isInMyList(selectedMovie.id) : false}
        onToggleMyList={toggleMyList}
      />
    </motion.div>
  );
};

export default Home;
