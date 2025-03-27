import React, { useState } from "react";

const HomePage = () => {
  const [formData, setFormData] = useState({
    income: "",
    riskLevel: "Select risk level",
    returnPeriod: "",
  });

  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowOptions(true);
  };

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}
    >
      {/* Form Container */}
      <div
        style={{
          padding: "20px",
          background: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            {/* Income Input */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
                htmlFor="income"
              >
                Income
              </label>
              <input
                type="number"
                id="income"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                placeholder="Enter income"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              />
            </div>

            {/* Risk Level Input */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
                htmlFor="riskLevel"
              >
                Risk Level
              </label>
              <select
                id="riskLevel"
                name="riskLevel"
                value={formData.riskLevel}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <option value="Select risk level">---Select---</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Return Period Input */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
                htmlFor="returnPeriod"
              >
                Return Period
              </label>
              <input
                type="number"
                id="returnPeriod"
                name="returnPeriod"
                value={formData.returnPeriod}
                onChange={handleInputChange}
                placeholder="Years"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                padding: "10px",
                background: "#00cc00",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "5px",
                alignSelf: "flex-end",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* New Div Below Form - Split into Two Sections */}
      {showOptions && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            gap: "20px", // Added space between left and right sections
          }}
        >
          {/* Left Side - Options */}
          <div
            style={{
              width: "48%",
              padding: "20px",
              background: "#f9f9f9",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Investment Recommendation</h3>
            <ul style={{ listStyleType: "none", padding: "0" }}>
              {["Option 1", "Option 2", "Option 3", "Option 4"].map(
                (option, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "10px",
                      padding: "15px",
                      background: "#ffffff",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        textDecoration: "none",
                        color: "#007BFF",
                        fontWeight: "bold",
                      }}
                    >
                      {option}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Right Side - Blank Box */}
          <div
            style={{
              width: "48%",
              padding: "20px",
              background: "",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
            }}
          >
            {/* Empty Box */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
