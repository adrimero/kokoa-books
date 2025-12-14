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
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: 20,
        borderRadius: 20,
        marginBottom: 18,
        color: "#fff",
        boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
        transition: "transform 0.28s ease, box-shadow 0.28s ease",
    },

    smallCard: {
        padding: 12,
        borderRadius: 16,
    },

    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 18,
    },

    image: {
        width: 100,
        borderRadius: 14,
        objectFit: "cover",
        cursor: "pointer",
        transition: "0.25s",
        boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
    },

    smallImage: {
        width: 55,
        borderRadius: 10,
        objectFit: "cover",
        cursor: "pointer",
        transition: "0.25s",
        boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
    },

    infoColumn: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 6,
    },

    title: {
        fontSize: 19,
        fontWeight: 700,
        color: "#fff",
        margin: 0,
    },

    text: {
        color: "#dcdcdc",
        margin: "2px 0",
        fontSize: 15,
    },

    favoriteButton: {
        fontSize: 30,
        cursor: "pointer",
        border: "none",
        background: "none",
        color: "#ffd95a",
        padding: 6,
        transition: "transform 0.25s ease, filter 0.25s",
    },
};

