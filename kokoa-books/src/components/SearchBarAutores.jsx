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

