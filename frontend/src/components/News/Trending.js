import React, { useState, useEffect } from "react";
import axios from "axios";

const options = [
  "Gold",
  "Mutual Fund",
  "Stocks",
  "Fixed Deposit",
  "Recurring Deposit",
];

const Trending = () => {
  const [activeOption, setActiveOption] = useState("Gold");
  const [items, setItems] = useState([]);

  const fetchData = async (category) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${category.toLowerCase().replace(/\s/g, "")}`);
      setItems(response.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(activeOption);
  }, [activeOption]);

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "left",
        paddingTop: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "rgba(10, 25, 50)",
        paddingLeft: "20px",
        paddingBottom: "40px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", paddingBottom: "20px" }}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setActiveOption(option)}
            style={{
              backgroundColor: activeOption === option ? "#4bcd3e" : "white",
              color: activeOption === option ? "white" : "black",
              border: "none",
              borderRadius: "6px",
              padding: "10px 20px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              width: "300px",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "black", fontSize: "1rem" }}
            >
              {item.title || `Top ${activeOption} News ${index + 1}`}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
