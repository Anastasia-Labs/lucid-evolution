import React, { useState, useEffect } from "react";

export function FeatureList({ features }) {
  return (
    <div
      style={{
        backgroundColor: "rgba(220, 38, 38, 0.05)",
        borderRadius: "8px",
        padding: "1.5rem",
      }}
    >
      <h3
        style={{
          fontSize: "1.4rem",
          marginBottom: "1rem",
          color: "#dc2626",
        }}
      >
        Key Features
      </h3>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {features.map((feature, index) => (
          <li
            key={index}
            style={{
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "#dc2626",
                marginRight: "0.75rem",
                fontSize: "1.2rem",
              }}
            >
              ▹
            </span>
            <span
              style={{
                fontSize: "1rem",
                color: "#333",
              }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
