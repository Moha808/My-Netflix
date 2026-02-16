// Custom hook for managing My List with real-time updates
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { addToMyList, removeFromMyList, getMyList } from "../services/myList";
import { toast } from "react-toastify";

const useMyList = () => {
  const { user } = useAuth();
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the user's My List
  const fetchMyList = useCallback(async () => {
    if (!user) {
      setMyList([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const list = await getMyList(user.uid);
      setMyList(list);
    } catch (error) {
      console.error("Error fetching My List:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchMyList();
  }, [fetchMyList]);

  // Check if a movie is in My List
  const isInMyList = useCallback(
    (movieId) => myList.some((item) => String(item.id) === String(movieId)),
    [myList],
  );

  // Toggle a movie in My List (add or remove)
  const toggleMyList = useCallback(
    async (movie) => {
      if (!user) {
        toast.error("Please sign in to add movies to your list.");
        return;
      }

      const movieId = movie.id;
      const inList = isInMyList(movieId);

      if (inList) {
        // Optimistic update: remove immediately
        setMyList((prev) =>
          prev.filter((item) => String(item.id) !== String(movieId)),
        );
        const success = await removeFromMyList(user.uid, movieId);
        if (success) {
          toast.info("Removed from My List");
        } else {
          // Revert on failure
          fetchMyList();
          toast.error("Failed to remove from My List");
        }
      } else {
        // Optimistic update: add immediately
        setMyList((prev) => [...prev, { ...movie, id: String(movieId) }]);
        const success = await addToMyList(user.uid, movie);
        if (success) {
          toast.success("Added to My List");
        } else {
          // Revert on failure
          fetchMyList();
          toast.error("Failed to add to My List");
        }
      }
    },
    [user, isInMyList, fetchMyList],
  );

  return {
    myList,
    loading,
    isInMyList,
    toggleMyList,
    refreshMyList: fetchMyList,
  };
};

export default useMyList;
