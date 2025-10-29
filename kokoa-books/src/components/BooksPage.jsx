// /src/components/BooksPage.jsx
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import BookItem from "./BookItem";
import { fetchBooks as apiFetchBooks } from "../api/booksApi";

export default function BooksPage() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastQuery, setLastQuery] = useState("");

    const handleSearch = async (query) => {
        setError(null);

        if (!query || query.length < 3) {
            setError("Escribe al menos 3 caracteres para buscar.");
            setResults([]);
            return;
        }

        // Si el query es igual al último, podemos evitar re-búsqueda opcionalmente
        // if (query === lastQuery) return;

        setLoading(true);
        setResults([]);
        try {
            const books = await apiFetchBooks(query);
            setResults(books);
            setLastQuery(query);
            if (!books || books.length === 0) {
                // No hay resultados: lo indicamos pero no es un "error"
                setError(null);
            }
        } catch (err) {
            console.error("Error buscando libros:", err);
            setError("Ocurrió un error al buscar. Intenta de nuevo.");
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
            <h1>Buscar libros</h1>

            <SearchBar onSearch={handleSearch} disabled={loading} />

            {loading && <p>Cargando resultados...</p>}
            {error && <p style={{ color: "crimson" }}>{error}</p>}

            {!loading && !error && results.length === 0 && lastQuery && (
                <p>No se encontraron libros para "{lastQuery}".</p>
            )}

            <div>
                {results.map((b) => (
                    // book.id es obligatorio según tu modelo
                    <BookItem key={b.id} book={b} />
                ))}
            </div>
        </div>
    );
}
