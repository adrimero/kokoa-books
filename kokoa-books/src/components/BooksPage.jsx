// Completely fixed layout: full-width columns, perfect alignment,
// suggestion dropdown ALWAYS above everything, improved spacing and visuals
// src/components/BooksPage.jsx
import { useState } from "react";

import { fetchBooksByQuery, fetchBooksByAuthorId } from "../api/booksApi";
import { searchAuthors } from "../api/authorsApi";

import useFavorites from "../hooks/useFavorites";

import SearchBarLibros from "./SearchBarLibros";
import SearchBarAutores from "./SearchBarAutores";
import BookItem from "./BookItem";
import BookDetailModal from "./BookDetailModal";

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const { favorites, toggleFavorite, isFavorite } = useFavorites();
    const [selectedBookId, setSelectedBookId] = useState(null);

    function openBookModal(id) {
        setSelectedBookId(id);
    }

    function closeBookModal() {
        setSelectedBookId(null);
    }

    async function handleSearchBooks(query) {
        const result = await fetchBooksByQuery(query);
        setBooks(result);
    }

    async function handleSearchAuthors(name) {
        const authors = await searchAuthors(name);

        if (authors.length === 0) {
            alert("No se encontró el autor");
            return;
        }

        const id = authors[0].id;
        const result = await fetchBooksByAuthorId(id);
        setBooks(result);
    }

    return (
        <div style={styles.pageContainer}>

            {/* 🌈 NUEVO TÍTULO HERMOSO */}
            <h1 style={styles.titleContainer}>
                <span style={styles.bookIcon}>📚</span>
                <span style={styles.titleText}>Buscador de Libros</span>
            </h1>

            <div style={styles.searchArea}>
                <div style={styles.searchRow}>
                    <SearchBarLibros onSearch={handleSearchBooks} />
                    <SearchBarAutores onSearch={handleSearchAuthors} />
                </div>
            </div>

            <div style={styles.columns}>
                <div style={styles.leftColumn}>
                    <h2 style={styles.subtitle}>Resultados</h2>
                    <div style={styles.resultsGrid}>
                        {books.map((b, i) => (
                            <BookItem
                                key={i}
                                book={b[0]}
                                isFavorite={isFavorite(b[0].id)}
                                toggleFavorite={() => toggleFavorite(b[0])}
                                onOpen={() => openBookModal(b[0].id)}
                            />
                        ))}
                    </div>
                </div>

                <div style={styles.rightColumn}>
                    <h2 style={styles.subtitle}>Favoritos ⭐</h2>

                    <div style={styles.favoritesScroll}>
                        {favorites.map((b, i) => (
                            <BookItem
                                key={i}
                                book={b}
                                isFavorite={true}
                                toggleFavorite={() => toggleFavorite(b)}
                                onOpen={() => openBookModal(b.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {selectedBookId && (
                <BookDetailModal
                    bookId={selectedBookId}
                    onClose={closeBookModal}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isFavorite}
                />
            )}
        </div>
    );
}

const styles = {
    pageContainer: {
        padding: 30,
        color: "#fff",
        maxWidth: 1500,
        margin: "0 auto",
        fontFamily: "Inter, system-ui, sans-serif",
        position: "relative",
        zIndex: 0,
    },

    /* 🌟 NUEVO TÍTULO */
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 35,
        marginTop: 5,
    },

    bookIcon: {
        fontSize: 70,
        marginBottom: 6,
        filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.35))",
    },

    titleText: {
        fontSize: 44,
        fontWeight: 900,
        letterSpacing: "1px",
        textAlign: "center",

        // 🌈 Gradiente suave pastel
        background: "linear-gradient(90deg, #7fffd4, #9cd3ff, #c6a4ff, #ffbde6)",
        WebkitBackgroundClip: "text",
        color: "transparent",

        textShadow: "0px 0px 10px rgba(255,255,255,0.12)",
    },

    searchArea: {
        padding: 20,
        borderRadius: 16,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        marginBottom: 30,
        boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
    },

    searchRow: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        width: "100%",
    },

    columns: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: 30,
        width: "100%",
    },

    leftColumn: {
        background: "rgba(255,255,255,0.05)",
        padding: 20,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
        minHeight: 600,
    },

    rightColumn: {
        background: "rgba(255,255,255,0.05)",
        padding: 20,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
        minHeight: 600,
        display: "flex",
        flexDirection: "column",
    },

    subtitle: {
        fontSize: 24,
        fontWeight: 700,
        marginBottom: 18,
    },

    resultsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 20,
    },

    favoritesScroll: {
        overflowY: "auto",
        paddingRight: 10,
        scrollbarWidth: "thin",
        flex: 1,
    },
};
