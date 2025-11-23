// Este componente muestra una barra de búsqueda diseñada
// para encontrar autores por nombre. Incluye un campo de texto
// y un botón que ejecuta la acción correspondiente cuando el usuario
// envía el formulario.

/**
 * Componente que permite buscar autores por nombre.
 *
 * Recibe:
 * onSearch: Función proporcionada por el componente padre que recibe el texto ingresado.
 *
 * Internamente controla:
 * name: Valor escrito por el usuario dentro del campo de texto.
 *
 * Cuando el usuario envía el formulario:
 * - Se evita que la página se recargue.
 * - Se revisa que el texto tenga contenido real.
 * - Se envía el texto limpio al componente padre.
 */
import { useState } from "react";

export default function SearchBarAutores({ onSearch }) {
    // Estado que almacena el nombre escrito por el usuario.
    const [name, setName] = useState("");

    /**
     * Maneja el envío del formulario.
     * Se asegura que el texto no esté vacío y luego
     * se llama a la función recibida desde el componente padre.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que el formulario recargue la página
        if (!name.trim()) return; // Previene búsquedas vacías
        onSearch(name.trim()); // Envía el texto limpio
    };

    return (
        // Formulario principal que contiene la barra de entrada y el botón
        <form onSubmit={handleSubmit} style={styles.form}>

            {/* Campo de texto donde el usuario escribe el nombre del autor */}
            <input
                type="text"
                placeholder="Buscar autor..."
                value={name}
                onChange={(e) => setName(e.target.value)}
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
 * Estilos consistentes usados en todo el componente.
 * Se mantienen minimalistas, con colores oscuros,
 * bordes suaves y una tipografía uniforme para que
 * el diseño sea claro y fácil de leer.
 */
const styles = {
    // Estilo general para el formulario
    form: {
        display: "flex",
        gap: 10,
        marginBottom: 16,
        width: "100%",
    },

    // Estilo del input de texto
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

    // Estilo del botón de envío
    button: {
        padding: "12px 18px",
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
