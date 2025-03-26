import React, { useState } from "react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          padding: "15px",
          background: "#f8f9fa",
          borderRadius: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#333" }}>
          Investment Recommendation System
        </h1>
      </div>

      <div
        style={{
          padding: "20px",
          background: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={() => setActiveTab("login")}
            style={{
              padding: "10px",
              width: "50%",
              background: activeTab === "login" ? "#28a745" : "#ddd",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "10px",
            }}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            style={{
              padding: "10px",
              width: "50%",
              background: activeTab === "signup" ? "#28a745" : "#ddd",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "10px",
            }}
          >
            Sign Up
          </button>
        </div>

        <div style={{ padding: "20px" }}>
          {activeTab === "login" ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
