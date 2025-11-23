// Este componente muestra los datos de un libro en una tarjeta elegante y centrada.
// La tarjeta se adapta tanto a la columna izquierda como a la sección de favoritos.
// Todo el contenido está alineado, con buena jerarquía visual y espaciado consistente.

/**
 * Componente que muestra la información principal de un libro.
 * Incluye título, autor, rating, portada y un botón de favorito.
 *
 * Se valida el libro antes de renderizar para evitar errores y mantener
 * una experiencia limpia y estable.
 */
export default function BookItem({ book, isFavorite, toggleFavorite }) {
    if (!book) return null;

    return (
        <div style={styles.card}>
            {/* Imagen a la izquierda y contenido a la derecha */}
            <div style={styles.row}>
                {book.image && (
                    <img
                        src={book.image}
                        alt={book.title}
                        style={styles.image}
                    />
                )}

                <div style={styles.infoColumn}>
                    {/* Título del libro */}
                    <h3 style={styles.title}>{book.title}</h3>

                    {/* Autor */}
                    <p style={styles.text}>
                        Autor: {book.authors?.[0]?.name || "Autor desconocido"}
                    </p>

                    {/* Rating */}
                    <p style={styles.text}>
                        Rating: {book.rating?.average || "Sin calificación"}
                    </p>
                </div>

                {/* Botón de favorito alineado al extremo derecho */}
                <button onClick={toggleFavorite} style={styles.favoriteButton}>
                    {isFavorite ? "⭐" : "☆"}
                </button>
            </div>
        </div>
    );
}

/**
 * Estilos modernos, limpios y agradables para todo el componente.
 * Mantienen un diseño visual uniforme entre tarjetas, páginas y listas.
 */
const styles = {
    // Tarjeta contenedora con diseño elegante
    card: {
        backgroundColor: "#1c1c1c",
        border: "1px solid #2d2d2d",
        padding: 16,
        borderRadius: 12,
        marginBottom: 14,
        color: "#ffffff",
        fontFamily: "system-ui, sans-serif",
        transition: "background-color 0.15s ease, transform 0.12s ease",
    },

    // Distribución horizontal: imagen - texto - favorito
    row: {
        display: "flex",
        alignItems: "center",
        gap: 14,
    },

    // Información textual alineada
    infoColumn: {
        flex: 1,
    },

    // Imagen del libro, ligeramente redondeada y con sombra
    image: {
        width: 90,
        height: "auto",
        borderRadius: 10,
        boxShadow: "0 3px 8px rgba(0,0,0,0.35)",
        objectFit: "cover",
    },

    // Título con fuerte jerarquía visual
    title: {
        fontSize: 17,
        fontWeight: 600,
        margin: 0,
        marginBottom: 6,
        color: "#ffffff",
    },

    // Texto base para autor y rating
    text: {
        margin: "3px 0",
        fontSize: 14,
        color: "#bbbbbb",
    },

    // Botón del favorito: grande, visible y armonioso con el diseño
    favoriteButton: {
        fontSize: 30,
        cursor: "pointer",
        border: "none",
        background: "none",
        color: "#ffdf57",
        padding: 4,
        transition: "transform 0.12s ease",
    },
};
