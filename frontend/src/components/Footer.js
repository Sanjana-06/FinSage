import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#00cc00",
        padding: "1px",
        textAlign: "center",
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p
        style={{
          margin: "0",
          fontSize: "14px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        © {new Date().getFullYear()} FIS. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
