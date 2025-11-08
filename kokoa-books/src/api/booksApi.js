// /src/api/booksApi.js
import axios from "axios";
import { normalizeBook } from "../utils/normalizeBook";

// Clave secreta para acceder a la API
const API_KEY = "dbd6c1ca3f3f4eecb969c4c8fcfd9323";
// Dirección base de la API
const BASE_URL = "https://api.bigbookapi.com/search-books";

export async function fetchBooks(query) {
    // Evita buscar si la entrada está vacía
    if (!query || query.trim().length === 0) return [];

    try {
        // Petición GET a la API con el texto de búsqueda
        const res = await axios.get(`${BASE_URL}?query=${encodeURIComponent(query)}`, {
            headers: {
                Accept: "application/json", // Pedimos la respuesta en JSON
                "X-API-Key": API_KEY,       // Clave personal para autenticar la solicitud
            },
        });

        // Extrae los libros, o un array vacío si no hay resultados
        const rawBooks = res.data?.books || [];

        // Normaliza cada libro para tener el mismo formato
        const books = rawBooks.map(normalizeBook);
        return books;
    } catch (err) {
        // Si algo falla, el error se envía al componente que llamó a esta función
        throw err;
    }
}