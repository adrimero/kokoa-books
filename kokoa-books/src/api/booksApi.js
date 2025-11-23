// src/api/booksApi.js
import axios from "axios";

const BASE_URL = "https://api.bigbookapi.com";
const API_KEY = import.meta.env.VITE_BIGBOOK_API_KEY;

// Buscar libros normal (por query)
export async function fetchBooksByQuery(query) {
    try {
        const url = `${BASE_URL}/search-books?query=${encodeURIComponent(query)}&api-key=${API_KEY}`;
        const res = await axios.get(url);

        console.log("LIBROS POR QUERY:", res.data);
        return res.data.books || [];
    } catch (e) {
        console.error("Error buscando libros por query:", e);
        return [];
    }
}

// Buscar libros por autor (por ID)
export async function fetchBooksByAuthorId(authorId) {
    try {
        const url = `${BASE_URL}/search-books?authors=${authorId}&api-key=${API_KEY}`;
        const res = await axios.get(url);

        console.log("LIBROS POR AUTOR:", res.data);
        return res.data.books || [];
    } catch (e) {
        console.error("Error buscando libros por autor:", e);
        return [];
    }
}
