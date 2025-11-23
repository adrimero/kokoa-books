// src/components/BookItem.jsx

export default function BookItem({ book, isFavorite, toggleFavorite, onOpen, small = false }) {
    if (!book) return null;

    return (
        <div
            style={{
                ...styles.card,
                ...(small ? styles.smallCard : {}),
            }}
        >
            <div style={styles.row}>
                {book.image && (
                    <img
                        src={book.image}
                        alt={book.title}
                        style={small ? styles.smallImage : styles.image}
                        onClick={onOpen}
                    />
                )}

                {!small && (
                    <div style={styles.infoColumn}>
                        <h3 style={styles.title}>{book.title}</h3>

                        <p style={styles.text}>
                            Autor: {book.authors?.[0]?.name || book.authors?.[0] || "Desconocido"}
                        </p>

                        <p style={styles.text}>
                            Rating: {book.rating?.average || "N/A"}
                        </p>
                    </div>
                )}

                <button
                    onClick={toggleFavorite}
                    style={{
                        ...styles.favoriteButton,
                        transform: isFavorite ? "scale(1.2)" : "scale(1)",
                        filter: isFavorite ? "drop-shadow(0 0 6px #ffdf57aa)" : "none",
                    }}
                >
                    {isFavorite ? "⭐" : "☆"}
                </button>
            </div>
        </div>
    );
}

const styles = {
    card: {
        backgroundColor: "#141414",
        border: "1px solid #282828",
        padding: 16,
        borderRadius: 14,
        marginBottom: 14,
        color: "#ffffff",
        fontFamily: "system-ui, sans-serif",
        transition: "all 0.18s ease",
        boxShadow: "0 0 12px rgba(0,0,0,0.25)",
    },

    smallCard: {
        padding: 8,
        marginBottom: 10,
        borderRadius: 10,
    },

    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
    },

    infoColumn: {
        flex: 1,
    },

    image: {
        width: 90,
        height: "auto",
        borderRadius: 10,
        objectFit: "cover",
        cursor: "pointer",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
    },

    smallImage: {
        width: 50,
        borderRadius: 6,
        cursor: "pointer",
        objectFit: "cover",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        boxShadow: "0 3px 8px rgba(0,0,0,0.35)",
    },

    title: {
        fontSize: 18,
        fontWeight: 600,
        margin: 0,
        marginBottom: 4,
        color: "#ffffff",
        letterSpacing: "0.3px",
    },

    text: {
        margin: "3px 0",
        fontSize: 14,
        color: "#c9c9c9",
    },

    favoriteButton: {
        fontSize: 28,
        cursor: "pointer",
        border: "none",
        background: "none",
        color: "#ffdf57",
        padding: 6,
        transition: "transform 0.18s ease",
    },
};
