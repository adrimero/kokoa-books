// src/components/BookDetailModal.jsx
import { useEffect, useState } from "react";
import { getBookDetails } from "../api/bookDetailsApi";
import useFavorites from "../hooks/useFavorites";

export default function BookDetailModal({ bookId, onClose }) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { toggleFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        if (!bookId) return;

        async function load() {
            setLoading(true);
            const d = await getBookDetails(bookId);
            setDetails(d);
            setLoading(false);
        }

        load();
    }, [bookId]);

    if (!bookId) return null;

    // Cerrar modal haciendo click fuera del contenedor
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div style={styles.overlay} onClick={handleOverlayClick}>
            <div style={styles.modal}>
                {/* Botón cerrar */}
                <button onClick={onClose} style={styles.closeBtn}>✖</button>

                {loading ? (
                    <p style={styles.loading}>Cargando...</p>
                ) : !details ? (
                    <p style={styles.error}>Error cargando el libro.</p>
                ) : (
                    <div style={styles.content}>
                        {/* Portada grande */}
                        <img
                            src={details.image}
                            alt={details.title}
                            style={styles.cover}
                        />

                        {/* Info del libro */}
                        <h2 style={styles.title}>{details.title}</h2>

                        <p style={styles.text}>
                            <strong>Autores:</strong>{" "}
                            {details.authors?.map(a => a.name).join(", ")}
                        </p>

                        <p style={styles.text}>
                            <strong>Rating:</strong>{" "}
                            {details.rating?.average || "No disponible"}
                        </p>

                        <p style={styles.text}>
                            <strong>Páginas:</strong>{" "}
                            {details.pages || "Desconocidas"}
                        </p>

                        <p style={styles.text}>
                            <strong>Fecha publicación:</strong>{" "}
                            {details.published_date || "N/A"}
                        </p>

                        <p style={styles.text}>
                            <strong>ISBN:</strong>{" "}
                            {details.isbn || "No disponible"}
                        </p>

                        <p style={styles.description}>
                            {details.description || "Sin descripción disponible."}
                        </p>

                        {/* BOTÓN FAVORITO */}
                        <button
                            onClick={() => toggleFavorite(details)}
                            style={{
                                ...styles.favoriteBtn,
                                background: isFavorite(details.id) ? "#c72e55" : "#ff3168",
                            }}
                        >
                            {isFavorite(details.id)
                                ? "⭐ Quitar de Favoritos"
                                : "☆ Agregar a Favoritos"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

//
// 🎨 ESTILOS MEJORADOS SEGÚN EL PROMPT
//
const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
        padding: 20,
        animation: "fadeIn 0.3s ease",
    },
    modal: {
        background: "#1b1b1b",
        width: "95%",
        maxWidth: 900,
        maxHeight: "90vh",
        overflowY: "auto",
        borderRadius: 18,
        padding: 30,
        position: "relative",
        border: "1px solid #333",
        boxShadow: "0 0 25px rgba(0,0,0,0.6)",
        animation: "scaleIn 0.25s ease",
    },
    closeBtn: {
        position: "absolute",
        top: 14,
        right: 14,
        background: "rgba(255,255,255,0.1)",
        border: "none",
        fontSize: 20,
        color: "#fff",
        cursor: "pointer",
        padding: "6px 10px",
        borderRadius: "50%",
        transition: "0.2s",
    },
    loading: { color: "#fff", textAlign: "center" },
    error: { color: "#fff", textAlign: "center" },

    content: {
        color: "#fff",
        textAlign: "center",
        paddingBottom: 10,
    },

    cover: {
        width: 280,
        borderRadius: 14,
        boxShadow: "0 6px 20px rgba(0,0,0,0.45)",
        marginBottom: 25,
        transition: "transform 0.3s ease",
        cursor: "pointer",
        objectFit: "cover",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
    },

    title: {
        fontSize: 28,
        marginBottom: 12,
        fontWeight: 700,
    },

    text: {
        fontSize: 15,
        color: "#ccc",
        margin: "7px 0",
    },

    description: {
        marginTop: 18,
        color: "#aaa",
        lineHeight: "1.6",
        fontSize: 15,
        padding: "0 10px",
    },

    favoriteBtn: {
        marginTop: 30,
        padding: "12px 20px",
        background: "#ff3168",
        border: "none",
        borderRadius: 12,
        color: "#fff",
        cursor: "pointer",
        fontSize: 16,
        fontWeight: 600,
        transition: "0.25s",
    },
};

//
// Animaciones añadidas con CSS-in-JS
//
Object.assign(document.body.style, {
    "--fadeIn": `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `,
    "--scaleIn": `
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `,
});
