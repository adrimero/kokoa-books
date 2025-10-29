import React, { useState, useEffect } from "react";
import axios from "axios";
import { normalizeBook } from "../utils/normalizeBook";

export default function ApiTest() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = "dbd6c1ca3f3f4eecb969c4c8fcfd9323";
    const QUERY = "harry potter";

    useEffect(() => {
    const fetchBooks = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://api.bigbookapi.com/search-books?query=${encodeURIComponent(QUERY)}`,
            {
            headers: {
                "Accept": "application/json",
                "X-API-Key": API_KEY  // Aquí va la clave, no en Authorization
                }
            }
        );

        const normalizedBooks = response.data.books.map(normalizeBook);
        setBooks(normalizedBooks);
        } catch (err) {
            console.error("Error fetching books:", err);
            setError("Error al cargar libros");
        } finally {
            setLoading(false);
        }
    };

    fetchBooks();
    }, []);

    if (loading) return <p>Cargando libros...</p>;
    if (error) return <p>{error}</p>;

    return <pre>{JSON.stringify(books, null, 2)}</pre>;
}
