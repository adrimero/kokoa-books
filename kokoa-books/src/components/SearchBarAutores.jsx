// src/components/SearchBarAutores.jsx

import { useState, useEffect } from "react";
import { searchAuthors } from "../api/authorsApi";

export default function SearchBarAutores({ onSearch }) {
    const [name, setName] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Buscar autores mientras el usuario escribe (debounce ligero)
    useEffect(() => {
        if (name.trim().length < 2) {
            setSuggestions([]);
            return;
        }

        const delay = setTimeout(async () => {
            const result = await searchAuthors(name.trim());

            // Filtrar duplicados por nombre
            const unique = [];
            const seen = new Set();

            result.forEach((a) => {
                const n = a.name?.trim();
                if (n && !seen.has(n)) {
                    seen.add(n);
                    unique.push(a);
                }
            });

            setSuggestions(unique.slice(0, 8));
        }, 200);

        return () => clearTimeout(delay);
    }, [name]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSearch(name.trim());
        setShowSuggestions(false);
    };

    const handleSelectSuggestion = (authorName) => {
        setName(authorName);
        setShowSuggestions(false);
        onSearch(authorName);
    };

    return (
        <div style={{ position: "relative", width: "100%" }}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Buscar autor..."
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setShowSuggestions(true);
                    }}
                    style={styles.input}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    onFocus={() => name.length >= 2 && setShowSuggestions(true)}
                />

                <button type="submit" style={styles.button}>
                    Buscar
                </button>
            </form>

            {/* CUADRO DE SUGERENCIAS */}
            {showSuggestions && suggestions.length > 0 && (
                <div style={styles.dropdown}>
                    {suggestions.map((s, i) => (
                        <div
                            key={i}
                            style={styles.dropdownItem}
                            onMouseDown={() => handleSelectSuggestion(s.name)}
                        >
                            {s.name}
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
        padding: "12px 20px",
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
