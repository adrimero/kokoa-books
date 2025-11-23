// src/api/authorsApi.js
import axios from "axios";

const BASE_URL = "https://api.bigbookapi.com";
const API_KEY = import.meta.env.VITE_BIGBOOK_API_KEY;

export async function searchAuthors(name) {
    try {
        const url = `${BASE_URL}/search-authors?name=${encodeURIComponent(name)}&api-key=${API_KEY}`;
        const res = await axios.get(url);

        console.log("AUTORES ENCONTRADOS:", res.data.authors);
        return res.data.authors || [];
    } catch (e) {
        console.error("Error buscando autores:", e);
        return [];
    }
}
