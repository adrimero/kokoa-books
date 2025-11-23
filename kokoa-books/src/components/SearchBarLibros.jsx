// src/components/SearchBarLibros.jsx

import { useState, useEffect } from "react";
import { fetchBooksByQuery } from "../api/booksApi";

export default function SearchBarLibros({ onSearch }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Autocompletar libros mientras escribe
    useEffect(() => {
        if (query.trim().length < 2) {
            setSuggestions([]);
            return;
        }

        const delay = setTimeout(async () => {
            const result = await fetchBooksByQuery(query.trim());

            // Extraer títulos únicos
            const seen = new Set();
            const unique = [];

            result.forEach((item) => {
                const book = item[0];
                if (!book?.title) return;

                const t = book.title.trim();
                if (!seen.has(t)) {
                    seen.add(t);
                    unique.push(book);
                }
            });

            setSuggestions(unique.slice(0, 8)); // máx 8 sugerencias
        }, 200);

        return () => clearTimeout(delay);
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        onSearch(query.trim());
        setShowSuggestions(false);
    };

    const handleSelect = (title) => {
        setQuery(title);
        setShowSuggestions(false);
        onSearch(title);
    };

    return (
        <div style={{ position: "relative", width: "100%" }}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Buscar libros..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>
                    Buscar
                </button>
            </form>

            {/* Dropdown de sugerencias */}
            {showSuggestions && suggestions.length > 0 && (
                <div style={styles.dropdown}>
                    {suggestions.map((b, i) => (
                        <div
                            key={i}
                            style={styles.dropdownItem}
                            onMouseDown={() => handleSelect(b.title)}
                        >
                            {b.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    form: {
        display: "flex",
        gap: 12,
        marginBottom: 18,
        width: "100%",
        backgroundColor: "#141414",
        padding: 12,
        borderRadius: 14,
        border: "1px solid #282828",
        boxShadow: "0 0 10px rgba(0,0,0,0.25)",
    },

    input: {
        flex: 1,
        padding: "12px 14px",
        borderRadius: 10,
        border: "1px solid #333",
        backgroundColor: "#0d0d0d",
        color: "#fff",
        fontSize: 16,
        outline: "none",
        transition: "border-color 0.18s ease, box-shadow 0.18s ease",
    },

    button: {
        padding: "12px 22px",
        backgroundColor: "#ff3168",
        border: "none",
        borderRadius: 10,
        color: "#fff",
        cursor: "pointer",
        fontSize: 16,
        fontWeight: 600,
        transition: "transform 0.18s ease, opacity 0.18s ease",
    },

    dropdown: {
        position: "absolute",
        top: 70,
        left: 0,
        width: "100%",
        backgroundColor: "#1c1c1c",
        border: "1px solid #333",
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
        zIndex: 10,
        maxHeight: 260,
        overflowY: "auto",
    },

    dropdownItem: {
        padding: "10px 14px",
        color: "#fff",
        cursor: "pointer",
        borderBottom: "1px solid #2a2a2a",
        transition: "background-color 0.15s ease",
    },
};
