export function normalizeBook(rawArray) {
    const book = rawArray[0];
    return {
        id: book.id,
        title: book.title,
        authors: book.authors?.map(a => a.name) || ["Autor desconocido"],
        coverUrl: book.image || "placeholder.jpg",
        rating: book.rating?.average || null,
    };
}
