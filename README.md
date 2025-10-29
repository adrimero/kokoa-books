# kokoa-books
Aplicación React para búsqueda y gestión de libros.

## Objetivo
Aprender a conectar React con una API REST, hacer peticiones HTTP, normalizar datos y mostrar resultados en la UI.

## Tecnologías
- React
- Vite
- Axios
- Postman

## Big Book API — Search Books

**Endpoint:**  
GET https://api.bigbookapi.com/search-books

**Headers usados:**  
- Accept: application/json  
- X-API-Key: dbd6c1ca3f3f4eecb969c4c8fcfd9323

## Normalización de datos

La API devuelve cada libro dentro de un array. Usamos `normalizeBook` para transformar cada libro a un formato simple con los campos necesarios:  
`id`, `title`, `authors` (lista de nombres), `coverUrl` y `rating`.

## Consumo de API en React con Axios

- La petición se realiza dentro de `useEffect` al montar el componente.
- Se manejan estados para carga (`loading`), error (`error`) y datos (`books`).
- Se envía la API key en el header `X-API-Key` para autenticar la petición.
- La respuesta se normaliza con `normalizeBook` antes de guardarla en el estado.
- Los datos se muestran en la UI en formato JSON para facilitar la prueba.