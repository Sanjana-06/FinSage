import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill all the fields!");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      await axios.post(
        "/api/user/signup",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("Registration Successful!");
    } catch (error) {
      setMessage("Error occurred!");
    }
  };

  return (
    <div
      style={{
        width: "90%",
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
        Sign Up
      </h2>
      {message && <p style={{ color: "red" }}>{message}</p>}

      {/* Name Input */}
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "95%",
            padding: "10px",
            marginTop: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Email Input */}
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
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Password Input */}
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <label>Password</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type={show ? "text" : "password"}
            placeholder="Enter a password"
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
              minWidth: "60px",
            }}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <label>Confirm Password</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              minWidth: "60px",
            }}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Submit Button */}
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
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
