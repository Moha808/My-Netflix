// Custom hook for fetching movies from TMDB API
import { useState, useEffect } from "react";
import { fetchMovies } from "../services/tmdb";

const useMovies = (url) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies(url);
        if (isMounted) {
          setMovies(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { movies, loading, error };
};

export default useMovies;
