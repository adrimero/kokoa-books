// src/utils/normalizeBook.js

/**
 * Convierte un libro crudo del API en un formato uniforme
 * para que sea fácil de usar dentro de la app.
 */
export function normalizeBook(rawArray) {
    const book = rawArray[0]; // La API envuelve cada libro en un array

    return {
        id: book.id,
        title: book.title,
        // Si no hay autores, asigna uno genérico
        authors: book.authors?.map(a => a.name) || ["Autor desconocido"],
        coverUrl: book.image || "placeholder.jpg",
        rating: book.rating?.average || null,
    };
}