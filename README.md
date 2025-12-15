# 📚 Buscador de Libros — BigBook API

Aplicación web hecha con **React + Vite** que permite buscar libros y autores usando la **BigBook API**, ver el detalle completo de un libro en un modal y guardar libros como **favoritos** usando `localStorage`.

---

## 0️⃣ **Características**

- 🔍 Buscar libros por título
- 🧑‍💼 Buscar libros por autor
- ✨ Autocompletado mientras se escribe
- 📖 Modal con información completa del libro
- ⭐ Agregar / quitar libros de favoritos
- 💾 Favoritos persistentes con `localStorage`
- 🎨 Interfaz moderna con estilos CSS-in-JS

---

## 1️⃣ **Tecnologías**

- **React**
- **Vite**
- **Axios**
- **JavaScript**
- **BigBook API**
- **CSS-in-JS**
- **LocalStorage**

---

## 2️⃣ **Estructura del proyecto**

```text
src/
├── api/
│   ├── authorsApi.js
│   ├── booksApi.js
│   └── bookDetailsApi.js
├── components/
│   ├── BooksPage.jsx
│   ├── BookItem.jsx
│   ├── BookDetailModal.jsx
│   ├── SearchBarLibros.jsx
│   └── SearchBarAutores.jsx
├── hooks/
│   └── useFavorites.js
└── utils/
    └── normalizeBook.js
````

---

## 3️⃣ **Configuración**

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_BIGBOOK_API_KEY=TU_API_KEY_AQUI
```

---

## 4️⃣ **Descripción rápida de módulos**

### **API**

* `authorsApi.js` → Busca autores por nombre
* `booksApi.js` → Busca libros por texto o por autor
* `bookDetailsApi.js` → Obtiene información completa de un libro

### **Componentes**

* `BooksPage.jsx` → Página principal
* `BookItem.jsx` → Tarjeta de libro
* `BookDetailModal.jsx` → Modal de detalles
* `SearchBarLibros.jsx` → Buscador de libros
* `SearchBarAutores.jsx` → Buscador de autores

### **Hook**

* `useFavorites.js` → Manejo de favoritos con `localStorage`

---

## 5️⃣ **Ejecución**

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

Abrir en el navegador:

```text
http://localhost:5173
```

---

## 6️⃣ **Notas**

* El autocompletado usa debounce para no saturar la API
* Los favoritos se guardan automáticamente
* No requiere backend

---

