import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const SignUp = ({ setIsLogin }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      await axios.post(
        "/api/user/signup",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setIsLogin(true); // Switch to login card after successful signup
    } catch (error) {
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div
  style={{
    position: "absolute",
    paddingTop: "10px",
    top: "0.5%", // Moves the card UP
    left: "-2%",
    width: "80%",
    //height: "99%", // Increases height below
    maxWidth: "450px",
    margin: "auto",
    paddingLeft: "20px",
    paddingRight: "20px",
    borderRadius: "15px",
    background: "rgba(10, 25, 50)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  }}
>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "white" }}>Sign Up</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}

      <div style={{ textAlign: "left", marginBottom: "10px", color: "#D3D3D3" }}>
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
            marginBottom: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ textAlign: "left", marginBottom: "10px", color: "#D3D3D3" }}>
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

      <div style={{ textAlign: "left", marginBottom: "10px", color: "#D3D3D3" }}>
        <label>Password</label>
          <input
            type={"password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

      <div style={{ textAlign: "left", marginBottom: "10px", color: "#D3D3D3" }}>
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

      <button
        onClick={submitHandler}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          background: "#009900",
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

      <p style={{ marginTop: "15px", fontSize: "14px", color: "#D3D3D3" }}>
        Already have an account?{" "}
        <span
          onClick={() => setIsLogin(true)} // Switch to login card
          style={{
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          Login here
        </span>
      </p>
    </div>
  );
};

export default SignUp;
