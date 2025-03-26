import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessage("Login Successful");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error occurred!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "auto",
        padding: "20px",
        borderRadius: "15px",
        background: "#f8f9fa",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>
        Login
      </h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "95%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <label>Password</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              flex: 1,
              marginTop: "5px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleClick}
            style={{
              marginLeft: "5px",
              padding: "8px",
              border: "none",
              background: "#28a745",
              color: "white",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <button
        onClick={submitHandler}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          background: "#28a745",
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
    </div>
  );
};

export default Login;
