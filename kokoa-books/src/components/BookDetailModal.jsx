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
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
        padding: 20,
    },

    modal: {
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(25px)",
        width: "95%",
        maxWidth: 900,
        maxHeight: "90vh",
        overflowY: "auto",
        borderRadius: 24,
        padding: 45,
        position: "relative",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 15px 45px rgba(0,0,0,0.55)",
    },

    closeBtn: {
        position: "absolute",
        top: 14,
        right: 14,
        background: "rgba(255,255,255,0.18)",
        border: "none",
        fontSize: 22,
        color: "#fff",
        cursor: "pointer",
        padding: "10px 12px",
        borderRadius: "50%",
    },

    cover: {
        width: 260,
        borderRadius: 18,
        boxShadow: "0 12px 34px rgba(0,0,0,0.55)",
        marginBottom: 25,
        objectFit: "cover",
    },

    title: {
        fontSize: 32,
        marginBottom: 15,
        fontWeight: 800,
        background: "linear-gradient(90deg,#ff4d7e,#7ed4ff)",
        WebkitBackgroundClip: "text",
        color: "transparent",
    },

    text: {
        fontSize: 17,
        color: "#e6e6e6",
        margin: "8px 0",
    },

    description: {
        marginTop: 20,
        color: "#ddd",
        lineHeight: "1.65",
        fontSize: 16,
    },

    favoriteBtn: {
        marginTop: 30,
        padding: "14px 24px",
        background: "#ff4d7e",
        border: "none",
        borderRadius: 16,
        color: "#fff",
        cursor: "pointer",
        fontSize: 17,
        fontWeight: 700,
        transition: "0.25s",
        boxShadow: "0 0 14px rgba(255,77,126,0.5)",
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
