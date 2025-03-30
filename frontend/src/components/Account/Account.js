import React, { useState } from "react";

const AccountPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleResetPassword = () => {
    alert("Password reset link has been sent to your email.");
  };

  return (
    <div style={{ backgroundColor: "#0A1932", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "500px", padding: "40px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#0A1932", color: "white" }}>
        <h2 style={{ fontWeight: "bold", textAlign: "center" }}>Account Settings</h2>
        <div style={{ marginBottom: "15px", display: "flex", flexDirection: "column",width:"95%" }}>
          <label style={{ marginBottom: "5px" }}>Name:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "15px", display: "flex", flexDirection: "column",width:"95%" }}>
          <label style={{ marginBottom: "5px" }}>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginTop: "40px", display: "flex", justifyContent: "space-between" }}>
          <button onClick={handleResetPassword} style={{ background: "blue", color: "white", padding: "8px", border: "none", cursor: "pointer", width: "48%", borderRadius: "5px", fontWeight: "bold" }}>Reset Password</button>
          <button style={{ background: "red", color: "white", padding: "8px", border: "none", cursor: "pointer", width: "48%", borderRadius: "5px", fontWeight: "bold" }}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
