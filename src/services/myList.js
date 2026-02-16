// My List (favorites) service using Firestore
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

// Add a movie to user's My List
export const addToMyList = async (userId, movie) => {
  try {
    const movieRef = doc(db, "users", userId, "myList", String(movie.id));
    await setDoc(movieRef, {
      id: movie.id,
      title: movie.title || movie.name || movie.original_name,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      overview: movie.overview,
      vote_average: movie.vote_average,
      media_type: movie.media_type || "movie",
      release_date: movie.release_date || movie.first_air_date || "",
      addedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Error adding to My List:", error);
    return false;
  }
};

// Remove a movie from user's My List
export const removeFromMyList = async (userId, movieId) => {
  try {
    const movieRef = doc(db, "users", userId, "myList", String(movieId));
    await deleteDoc(movieRef);
    return true;
  } catch (error) {
    console.error("Error removing from My List:", error);
    return false;
  }
};

// Get all movies from user's My List
export const getMyList = async (userId) => {
  try {
    const myListRef = collection(db, "users", userId, "myList");
    const snapshot = await getDocs(myListRef);
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error fetching My List:", error);
    return [];
  }
};
