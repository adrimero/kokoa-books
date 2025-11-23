// src/hooks/useFavorites.js
import { useState, useEffect } from "react";

export default function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (book) => {
        const exists = favorites.some(fav => fav.id === book.id);

        if (exists) {
            setFavorites(favorites.filter(fav => fav.id !== book.id));
        } else {
            setFavorites([...favorites, book]);
        }
    };

    const isFavorite = (id) => {
        return favorites.some(fav => fav.id === id);
    };

    return { favorites, toggleFavorite, isFavorite };
}
