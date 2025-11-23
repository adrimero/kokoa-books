import axios from "axios";

const BASE_URL = "https://api.bigbookapi.com";
const API_KEY = import.meta.env.VITE_BIGBOOK_API_KEY;

// Obtener detalles completos de un libro
export async function getBookDetails(id) {
    try {
        const url = `${BASE_URL}/${id}?api-key=${API_KEY}`;
        const res = await axios.get(url);
        return res.data || null;
    } catch (e) {
        console.error("ERROR getBookDetails:", e);
        return null;
    }
}