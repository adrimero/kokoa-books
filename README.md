# kokoa-books
Aplicación React para buscar y explorar libros de manera sencilla.

## Objetivo
Aprender a usar React para conectarse a una API, mostrar información y manejar estados como carga o error, mientras se construye una interfaz interactiva.

## Tecnologías
- React  
- Vite  
- Axios  

## Big Book API
La aplicación se conecta a la **Big Book API** para buscar libros.  
Se envía una API Key para obtener los datos de forma segura.

**Headers usados:**  
- Accept: application/json  
- X-API-Key: dbd6c1ca3f3f4eecb969c4c8fcfd9323

## Cómo funciona
- El usuario escribe un término de búsqueda y obtiene resultados en tiempo real.  
- Cada libro muestra título, autores y portada.  
- Se manejan mensajes de carga y error.  

## Componentes principales
- **SearchBar:** barra para escribir y buscar libros.  
- **BooksPage:** gestiona los resultados y estados.  
- **BookItem:** muestra la información de cada libro.  

## Resultado esperado
Una app funcional y fácil de usar que permite explorar libros de la API directamente desde el navegador.
