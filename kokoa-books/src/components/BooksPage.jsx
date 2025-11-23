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
            <h1 style={styles.title}>Buscador de Libros</h1>

            <div style={styles.searchArea}>
                <SearchBarLibros onSearch={handleSearchBooks} />
                <SearchBarAutores onSearch={handleSearchAuthors} />
            </div>

            <div style={styles.columns}>
                <div style={styles.leftColumn}>
                    <h2 style={styles.subtitle}>Resultados</h2>

                    <div>
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
        padding: 20,
        color: "#ffffff",
        fontFamily: "system-ui, sans-serif",
        maxWidth: 1300,
        margin: "0 auto",
    },

    title: {
        textAlign: "center",
        marginBottom: 26,
        fontWeight: 700,
        fontSize: 32,
        letterSpacing: 0.5,
        color: "#f5f5f5",
        textShadow: "0 2px 8px rgba(0,0,0,0.5)",
    },

    searchArea: {
        display: "flex",
        flexDirection: "column",
        gap: 14,
        marginBottom: 30,
        backgroundColor: "#1c1c1c",
        padding: 18,
        borderRadius: 14,
        border: "1px solid #2d2d2d",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    },

    columns: {
        display: "flex",
        gap: 30,
        alignItems: "flex-start",
    },

    leftColumn: {
        flex: 2,
        backgroundColor: "#141414",
        padding: 18,
        borderRadius: 14,
        border: "1px solid #2a2a2a",
        minHeight: 400,
        boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
        transition: "background-color 0.2s ease",
    },

    rightColumn: {
        flex: 1.2,
        backgroundColor: "#141414",
        padding: 18,
        borderRadius: 14,
        border: "1px solid #2a2a2a",
        height: 700,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
        transition: "background-color 0.2s ease",
    },

    subtitle: {
        marginTop: 0,
        marginBottom: 14,
        fontSize: 20,
        fontWeight: 600,
        color: "#ffffff",
        letterSpacing: 0.3,
    },

    favoritesScroll: {
        overflowY: "auto",
        paddingRight: 10,
        paddingBottom: 12,
        scrollbarWidth: "thin",
        scrollbarColor: "#444 #1b1b1b",
    },
};
