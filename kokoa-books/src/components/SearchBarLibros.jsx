// Este componente representa una barra de búsqueda simple para libros.
// Permite al usuario escribir un texto y enviarlo al componente padre
// cuando presiona el botón o confirma el formulario.

/**
 * Componente que permite buscar libros mediante un formulario.
 *
 * Recibe:
 * onSearch: Función entregada por el componente padre que recibe el texto ingresado.
 *
 * Internamente maneja:
 * query: Texto actual escrito por el usuario.
 *
 * Cuando el formulario se envía:
 * - Se evita que la página recargue.
 * - Se valida que el texto no esté vacío.
 * - Se envía el texto al padre para ejecutar la búsqueda.
 */
import { useState } from "react";

export default function SearchBarLibros({ onSearch }) {
    // Estado que almacena el texto que el usuario escribe en la barra de búsqueda.
    const [query, setQuery] = useState("");

    /**
     * Maneja el envío del formulario.
     * Se valida que el texto tenga contenido útil.
     * Si es válido, se llama a la función de búsqueda entregada por el padre.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita recargar la página
        if (!query.trim()) return; // Evita búsquedas vacías
        onSearch(query.trim()); // Envía el texto limpio al componente padre
    };

    return (
        // Formulario principal con estilos uniformes
        <form onSubmit={handleSubmit} style={styles.form}>

            {/* Campo de texto para escribir la búsqueda */}
            <input
                type="text"
                placeholder="Buscar libros..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={styles.input}
            />

            {/* Botón para ejecutar la búsqueda */}
            <button type="submit" style={styles.button}>
                Buscar
            </button>
        </form>
    );
}

/**
 * Estilos minimalistas y consistentes usados en todo el componente.
 * Se usan colores oscuros, bordes suaves y una tipografía uniforme.
 * El objetivo es mantener un diseño limpio y fácil de leer.
 */
const styles = {
    // Estilo general del formulario
    form: {
        display: "flex",
        gap: 10,
        marginBottom: 16,
        width: "100%",
    },

    // Estilo del campo de texto
    input: {
        flex: 1,
        padding: "12px 14px",
        borderRadius: 8,
        border: "1px solid #555",
        backgroundColor: "#111",
        color: "#fff",
        fontSize: 16,
        outline: "none",
    },

    // Estilo del botón de búsqueda
    button: {
        padding: "12px 20px",
        backgroundColor: "#ff3168",
        border: "none",
        borderRadius: 8,
        color: "#fff",
        cursor: "pointer",
        fontSize: 16,
        fontWeight: 600,
        transition: "opacity 0.2s ease",
    },
};
