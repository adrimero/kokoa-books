// Página principal que muestra buscadores, resultados y favoritos.
// Organiza el diseño en dos columnas: libros a la izquierda y favoritos a la derecha.

import { useState } from "react";

import { fetchBooksByQuery, fetchBooksByAuthorId } from "../api/booksApi";
import { searchAuthors } from "../api/authorsApi";

import useFavorites from "../hooks/useFavorites";

import SearchBarLibros from "./SearchBarLibros";
import SearchBarAutores from "./SearchBarAutores";
import BookItem from "./BookItem";

/**
 * Esta página controla las búsquedas de libros y autores
 * y muestra los resultados junto con los favoritos.
 *
 * La interfaz se divide en dos columnas:
 * - Columna izquierda: resultados
 * - Columna derecha: favoritos con scroll
 */
export default function BooksPage() {
    // Lista de libros encontrados en una búsqueda
    const [books, setBooks] = useState([]);

    // Hook personalizado que maneja favoritos
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    /**
     * Maneja búsqueda por texto
     */
    async function handleSearchBooks(query) {
        const result = await fetchBooksByQuery(query);
        setBooks(result);
    }

    /**
     * Maneja búsqueda basada en un autor encontrado por nombre
     */
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
            {/* Título principal */}
            <h1 style={styles.title}>Buscador de Libros</h1>

            {/* Contenedor de formularios de búsqueda */}
            <div style={styles.searchArea}>
                <SearchBarLibros onSearch={handleSearchBooks} />
                <SearchBarAutores onSearch={handleSearchAuthors} />
            </div>

            {/* Contenedor general tipo dos columnas */}
            <div style={styles.columns}>
                {/* Columna izquierda: resultados */}
                <div style={styles.leftColumn}>
                    <h2 style={styles.subtitle}>Resultados</h2>

                    <div>
                        {books.map((b, i) => (
                            <BookItem
                                key={i}
                                book={b[0]}
                                isFavorite={isFavorite(b[0].id)}
                                toggleFavorite={() => toggleFavorite(b[0])}
                            />
                        ))}
                    </div>
                </div>

                {/* Columna derecha: favoritos */}
                <div style={styles.rightColumn}>
                    <h2 style={styles.subtitle}>Favoritos ⭐</h2>

                    {/* Lista deslizable */}
                    <div style={styles.favoritesScroll}>
                        {favorites.map((b, i) => (
                            <BookItem
                                key={i}
                                book={b}
                                isFavorite={true}
                                toggleFavorite={() => toggleFavorite(b)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Estilos visuales modernos, limpios y equilibrados.
 * El diseño usa tipografía uniforme, columnas fluidas
 * y una sección de favoritos elegante con scroll vertical.
 */
const styles = {
    pageContainer: {
        padding: 20,
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        maxWidth: 1300,
        margin: "0 auto",
    },

    title: {
        textAlign: "center",
        marginBottom: 20,
        fontWeight: 700,
    },

    searchArea: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        marginBottom: 25,
    },

    // Distribuye dos columnas de manera limpia
    columns: {
        display: "flex",
        gap: 30,
        alignItems: "flex-start",
    },

    // Columna izquierda (resultados)
    leftColumn: {
        flex: 2,
        backgroundColor: "#1b1b1b",
        padding: 16,
        borderRadius: 12,
        border: "1px solid #2d2d2d",
        minHeight: 400,
    },

    // Columna derecha (favoritos)
    rightColumn: {
        flex: 1.2, // Se hace un poco más ancha que antes
        backgroundColor: "#1b1b1b",
        padding: 18,
        borderRadius: 14,
        border: "1px solid #2d2d2d",
        height: 700, // ALTURA MÁS GRANDE
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 15px rgba(0,0,0,0.35)", // Hace que se vea más destacada
    },


    subtitle: {
        marginTop: 0,
        marginBottom: 12,
        fontSize: 20,
        fontWeight: 600,
        color: "#ffffff",
    },

    // Área scrollable para los favoritos
    favoritesScroll: {
        overflowY: "auto",
        paddingRight: 10,
        paddingBottom: 12,
        scrollbarWidth: "thin",
        scrollbarColor: "#888 #1b1b1b",
    },

};
