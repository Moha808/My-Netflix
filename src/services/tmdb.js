// TMDB API service layer
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Image URL helpers
export const getImageUrl = (path, size = "w500") => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path, size = "original") => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// TMDB API request endpoints
const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

// Fetch movies from a specific endpoint
export const fetchMovies = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch movie/TV show details by ID
export const fetchMovieDetails = async (id, mediaType = "movie") => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&append_to_response=videos,credits,similar`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

// Fetch movie videos (trailers)
export const fetchMovieVideos = async (id, mediaType = "movie") => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}&language=en-US`,
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

// Search movies and TV shows
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`,
    );
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

export default requests;
