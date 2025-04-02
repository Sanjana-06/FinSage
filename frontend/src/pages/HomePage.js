import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Lightbulb, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [userIncome, setUserIncome] = useState(null);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("...");
  const [formData, setFormData] = useState({
    income: "",
    riskLevel: "Select risk level",
    returnPeriod: "",
  });
  useEffect(() => {
    fetch("https://localhost:5000/api/investment-recommendation") // Replace with actual API URL
      .then((response) => response.json())
      .then((data) => setUserIncome(data.income)) // Assuming API response is { income: 5000 }
      .catch((error) => console.error("Error fetching income:", error));
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserName(response.data.name);
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchUserProfile();
  }, []);

  const [investmentResult, setInvestmentResult] = useState(null);
  const [showAI, setShowAI] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAIRecommendation = () => {
    setShowAI(!showAI);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/investment-recommendation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      setInvestmentResult(data);
    } catch (error) {
      console.error("Error fetching investment recommendation:", error);
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        paddingTop: "20px",
        fontFamily: "Arial, sans-serif",
        height: "100vh",
        backgroundColor: "rgba(10, 25, 50)",
      }}
    >
      {/* Greeting */}
      <h1
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "left",
          fontSize: "2rem",
          color: "white",
          paddingLeft: "9%",
        }}
      >
        {`Hello ${userName} ...`.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </h1>
      <div
        style={{
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.3)", // White with 30% opacity
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "80%",
          margin: "auto",
          maxWidth: "1000px",
          backdropFilter: "blur(10px)", // Glass effect for better readability
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
              color: "white",
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
                background: "#4bcd3e",
                color: "rgba(10, 25, 50)",
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
      {investmentResult && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            gap: "20px",
            marginBottom: "50px", // Add this line to create space between the cards and the footer
          }}
        >
          {/* Left Side - Options */}
          <div
            style={{
              width: "48%",
              padding: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            {/* Heading Changes Dynamically */}
            <h3 style={{ color: "white" }}>
              {showAI
                ? "Investment Recommendation with AI"
                : "Investment Recommendation"}
            </h3>

            {/* Icon for AI or Reset */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={handleAIRecommendation}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {showAI ? (
                <RotateCcw size={26} color="black" /> // Reset Symbol in Red
              ) : (
                <Lightbulb size={26} color="#FFA500" /> // Bulb in Orange
              )}

              {/* Tooltip Appears Above */}
              
              {showTooltip && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "35px",
                    right: "-10px",
                    backgroundColor: "#222",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
                    transition: "opacity 0.3s ease-in-out",
                    opacity: showTooltip ? 1 : 0,
                    pointerEvents: "none",
                  }}
                >
                  {showAI ? "🔄 Reset to Normal" : "⚡ AI Recommendation"}
                </div>
              )}
            </div>

            {/* Options List - Toggle AI/Normal */}
            {showAI ? (
            <ul style={{ listStyleType: "none", padding: "0" }}>
              {investmentResult &&
                Object.entries(investmentResult)
                  .sort(([, a], [, b]) => b - a)
                  .map(([asset, percent], index) => {
                    // const amount = (userIncome * percent).toFixed(2);
                    <li
                      key={index}
                      style={{
                        marginBottom: "10px",
                        padding: "15px",
                        background: "#ffffff",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                        transition: "all 0.3s ease-in-out",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/${asset.toLowerCase()}`)} // Navigate on click
                    >
                      <span
                        style={{
                          textDecoration: "none",
                          color: "#007BFF",
                          fontWeight: "bold",
                        }}
                      >
                        {/* {asset} - {percent * 100}% of income = ${amount} */}
                      </span>
                    </li>
              })}
            </ul>
            ) : (
              <p style={{ color: "white", textAlign: "center" }}>
                Enable AI to see investment recommendations.
              </p>
            )}
          </div>

          {/* Right Side - Blank Box */}
          <div
            style={{
              width: "48%",
              padding: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
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