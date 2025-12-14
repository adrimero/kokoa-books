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
        gap: 14,
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        padding: 16,
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.1)",
    },

    input: {
        flex: 1,
        padding: "13px 18px",
        borderRadius: 14,
        background: "rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "#fff",
        fontSize: 16,
        outline: "none",
        transition: "0.25s",
    },

    button: {
        padding: "12px 24px",
        background: "#ff4d7e",
        border: "none",
        borderRadius: 14,
        color: "#fff",
        fontWeight: 700,
        cursor: "pointer",
        fontSize: 16,
        transition: "0.25s",
    },

    dropdown: {
        position: "absolute",
        top: 70,
        left: 0,
        width: "100%",
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(16px)",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.12)",
        maxHeight: 280,
        overflowY: "auto",
        zIndex: 10,
    },

    dropdownItem: {
        padding: "14px 18px",
        color: "#fff",
        cursor: "pointer",
        transition: "0.22s",
        fontSize: 15,
    },
};
