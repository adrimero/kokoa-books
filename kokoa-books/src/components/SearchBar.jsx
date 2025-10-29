// /src/components/SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch, disabled = false }) {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value.trim());
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
            <input
                type="text"
                placeholder="Busca libros (mín. 3 caracteres)"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
                aria-label="buscar-libros"
                style={{ padding: "8px 12px", width: "60%", marginRight: 8 }}
            />
            <button type="submit" disabled={disabled}>
                Buscar
            </button>
        </form>
    );
}
