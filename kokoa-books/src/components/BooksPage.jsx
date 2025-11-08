import React, { useState } from "react";
import SearchBar from "./SearchBar";
import BookItem from "./BookItem";
import { fetchBooks as apiFetchBooks } from "../api/booksApi";

export default function BooksPage() {
    // Guarda los libros que llegan del API, setResults actualiza este array.
    const [results, setResults] = useState([]);
    // Indica si la búsqueda está en curso. Se activa antes de la petición y se desactiva al terminar.
    const [loading, setLoading] = useState(false);
    // Guarda un mensaje de error. Si es null, significa que no hubo errores.
    const [error, setError] = useState(null);
    // Guarda el último texto buscado. Útil para mostrar mensajes o evitar repeticiones.
    const [lastQuery, setLastQuery] = useState("");

    // Maneja todo el proceso de búsqueda
    const handleSearch = async (query) => {
        setError(null); // Limpia errores anteriores

        if (!query || query.length < 3) {
            setError("Escribe al menos 3 caracteres para buscar.");
            setResults([]);
            return;
        }

        setLoading(true);
        setResults([]); // Limpia resultados previos
        try {
            const books = await apiFetchBooks(query); // Llama al API
            setResults(books); // Actualiza los resultados
            setLastQuery(query);
            if (!books || books.length === 0) {
                setError(null); // Sin resultados, pero sin error
            }
        } catch (err) {
            console.error("Error buscando libros:", err);
            setError("Ocurrió un error al buscar. Intenta de nuevo.");
            setResults([]);
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>📚 Buscador de Libros</h1>

            {/* Barra de búsqueda */}
            <SearchBar onSearch={handleSearch} disabled={loading} />

            {/* Estado de carga */}
            {loading && <p style={styles.info}>Cargando resultados...</p>}

            {/* Mensaje de error */}
            {error && <p style={styles.error}>{error}</p>}

            {/* Mensaje si no hay resultados */}
            {!loading && !error && results.length === 0 && lastQuery && (
                <p style={styles.info}>No se encontraron libros para "{lastQuery}".</p>
            )}

            {/* Lista de resultados */}
            <div>
                {results.map((b) => (
                    <BookItem key={b.id} book={b} /> // Cada libro individual
                ))}
            </div>
        </div>
    );
}

// 🎨 Estilo simple y centrado
const styles = {
    container: {
        maxWidth: 700,
        margin: "0 auto",
        padding: "20px",
        fontFamily: "system-ui, sans-serif",
        color: "#222",
    },
    title: {
        color: "white",
        textAlign: "center",
        fontWeight: 700,
        marginBottom: "16px",
    },
    info: {
        textAlign: "center",
        color: "#555",
        margin: "8px 0",
    },
    error: {
        textAlign: "center",
        color: "crimson",
        fontWeight: 500,
    },
};
