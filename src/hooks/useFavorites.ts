import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "ratingfeed_favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const toggleFavorite = useCallback((offerId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(offerId)
        ? prev.filter((id) => id !== offerId)
        : [...prev, offerId];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (offerId: string) => favorites.includes(offerId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
};
