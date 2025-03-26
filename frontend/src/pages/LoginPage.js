import React, { useState } from "react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div
      style={{
        position: "absolute",
        right: "50px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "500px",
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          padding: "20px",
          background: "rgba(255, 255, 255, 0.3)",
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
              background: activeTab === "login" ? "#28a745" : "#f8f9fa",
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
              background: activeTab === "signup" ? "#28a745" : "#f8f9fa",
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
          {activeTab === "login" ? <Login /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
