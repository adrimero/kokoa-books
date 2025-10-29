import { normalizeBook } from "../utils/normalizeBook";

export async function fetchBooks(query) {
    const response = await fetch(
        `https://api.bigbookapi.com/search-books?query=${encodeURIComponent(query)}`,
        {
            method: "GET",
            headers: {
                    "Accept": "application/json",
                    "X-API-Key": API_KEY
                }
        }
    );

    const data = await response.json();

    // Transformamos los libros usando normalizeBook
    const books = data.books.map(normalizeBook);

    return books;
}
