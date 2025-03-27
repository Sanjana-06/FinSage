import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
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
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", data.token); // Store token
      navigate("/home");
    } catch (error) {
      setMessage("Invalid Credentials!");
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
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
              paddingRight: "40px",
            }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              cursor: "pointer",
              color: "black",
              marginTop: "6px",
            }}
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
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
