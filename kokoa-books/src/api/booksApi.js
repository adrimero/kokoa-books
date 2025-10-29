// /src/api/booksApi.js
import axios from "axios";
import { normalizeBook } from "../utils/normalizeBook";

const API_KEY = "dbd6c1ca3f3f4eecb969c4c8fcfd9323";
const BASE_URL = "https://api.bigbookapi.com/search-books";

export async function fetchBooks(query) {
    if (!query || query.trim().length === 0) return [];

    try {
        const res = await axios.get(`${BASE_URL}?query=${encodeURIComponent(query)}`, {
            headers: {
                Accept: "application/json",
                "X-API-Key": API_KEY,
            },
        });

        const rawBooks = res.data?.books || [];
        // La API devuelve cada libro dentro de un array según tu normalizeBook actual
        const books = rawBooks.map(normalizeBook);
        return books;
    } catch (err) {
        // Re-lanzamos el error para que el caller lo maneje
        throw err;
    }
}
