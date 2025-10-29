// src/utils/normalizeBook.js

/**
 * Convierte un libro crudo del API en un objeto limpio para la app
 * @param {Array} rawArray - cada libro viene dentro de un array de Big Book API
 * @returns {Object} book normalizado
 */

export function normalizeBook(rawArray) {
    const book = rawArray[0];
    return {
        id: book.id,
        title: book.title,
        authors: book.authors?.map(a => a.name) || ["Autor desconocido"],
        coverUrl: book.image || "placeholder.jpg",
        rating: book.rating?.average || null
    };
}
