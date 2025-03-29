import React, { useState } from "react";
import Login from "../Components/Authentication/Login";
import SignUp from "../Components/Authentication/SignUp";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/BackgroundVideo.mp4" type="video/mp4" />
      </video>

      <h1
        style={{
          position: "absolute",
          top: "50px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "42px",
          fontWeight: "bold",
          fontFamily: "'Orbitron', sans-serif",
          color: "#FFA500", 
          textShadow: "0px 0px 10px rgba(255, 165, 0, 0.8), 0px 0px 20px rgba(255, 165, 0, 0.5)", // Strong glow effect
          letterSpacing: "3px",
          textTransform: "uppercase",
        }}
      >
      <span style={{ color: "#FFD700", fontWeight: "bold" }}>
        <span style={{ fontSize: "50px" }}>F</span>
        <span style={{ fontSize: "40px", textTransform: "lowercase" }}>in</span>
        <span style={{ fontSize: "50px" }}>G</span>
        <span style={{ fontSize: "40px", textTransform: "lowercase" }}>rowth</span>
      </span>

      </h1>
            <div
              style={{
                position: "absolute",
                right: "350px",
                top: "55%",
                transform: "translateY(-50%)",
                width: "450px",
                height: "450px",
                textAlign: "center",
                padding: "20px",
                fontFamily: "Arial, sans-serif",
              }}
        >
        <div style={{ padding: "20px" }}>
          {isLogin ? <Login setIsLogin={setIsLogin} /> : <SignUp setIsLogin={setIsLogin} />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
