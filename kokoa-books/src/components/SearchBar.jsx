// /src/components/SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch, disabled = false }) {
    // Guarda lo que el usuario escribe en el input
    const [value, setValue] = useState("");

    // Se ejecuta al presionar "Enter" o el botón
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que el formulario recargue la página
        onSearch(value.trim()); // Envía el texto limpio a BooksPage
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                placeholder="Busca libros (mín. 3 caracteres)"
                value={value}
                onChange={(e) => setValue(e.target.value)} // Actualiza cada vez que el usuario escribe
                disabled={disabled}
                aria-label="buscar-libros"
                style={styles.input}
            />
            <button type="submit" disabled={disabled} style={styles.button}>
                Buscar
            </button>
        </form>
    );
}

// 🎨 Estilo simple y limpio
const styles = {
    form: {
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        marginBottom: "20px",
    },
    input: {
        flex: 1,
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "14px",
    },
    button: {
        padding: "8px 16px",
        background: "#2d89ef",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "0.3s",
    },
};