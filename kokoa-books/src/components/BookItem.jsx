// /src/components/BookItem.jsx
import React from "react";

export default function BookItem({ book }) {
    if (!book) return null; // Si no hay libro, no renderiza nada

    const { title, authors = [], coverUrl, rating } = book;

    return (
        <div style={styles.card}>
            <img
                src={coverUrl || "placeholder.jpg"}
                alt={title}
                style={styles.image}
                onError={(e) => (e.target.src = "placeholder.jpg")} // Si falla la imagen, usa una por defecto
            />
            <div>
                <h3 style={styles.title}>{title}</h3>
                <p style={styles.authors}>{authors.join(", ")}</p>
                {rating != null && <p style={styles.rating}>⭐ {rating}</p>}
            </div>
        </div>
    );
}

// 🎨 Estilo minimalista y limpio
const styles = {
    card: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 0",
        borderBottom: "1px solid #ddd",
    },
    image: {
        width: 60,
        height: 90,
        objectFit: "cover",
        borderRadius: 6,
        boxShadow: "0 0 4px rgba(0,0,0,0.1)",
    },
    title: {
        margin: 0,
        fontSize: "15px",
        fontWeight: 600,
        color: "#b6b4b4ff",
    },
    authors: {
        margin: "4px 0",
        fontSize: "13px",
        color: "#666",
    },
    rating: {
        fontSize: "12px",
        color: "#888",
    },
};

