// /src/components/BookItem.jsx
import React from "react";

export default function BookItem({ book }) {
    if (!book) return null;
    const { title, authors = [], coverUrl, rating } = book;

    return (
        <div style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            padding: 8,
            borderBottom: "1px solid #eee"
        }}>
            <img
                src={coverUrl || "placeholder.jpg"}
                alt={title}
                style={{ width: 60, height: 90, objectFit: "cover", borderRadius: 4 }}
                onError={(e) => (e.target.src = "placeholder.jpg")}
            />
            <div>
                <div style={{ fontWeight: 600 }}>{title}</div>
                <div style={{ fontSize: 13, color: "#555" }}>{authors.join(", ")}</div>
                {rating != null && <div style={{ fontSize: 12, color: "#777" }}>⭐ {rating}</div>}
            </div>
        </div>
    );
}
