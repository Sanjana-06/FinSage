import React, { useState } from "react";
import axios from "axios";

const Recommend = () => {
  const [formData, setFormData] = useState({
    investmentAmount: "",
    riskLevel: "Select risk level",
    returnPeriod: "",
  });

  const [recommendations, setRecommendations] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/mf/recommendation",
        formData
      );
      console.log(response.data);

      setRecommendations(response.data); // Store backend response
      setShowOptions(true); // Show recommendations
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        paddingTop: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "rgba(10, 25, 50)",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1
        style={{ textAlign: "left", paddingLeft: "10%", paddingBottom: "10px" }}
      >
        Mutual Fund Recommendation
      </h1>

      {/* Form Container */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "80%",
          margin: "auto",
          maxWidth: "1000px",
          backdropFilter: "blur(10px)",
          marginBottom: "15px",
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
            {/* Investment Amount Input */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
                htmlFor="investmentAmount"
              >
                Investment Amount
              </label>
              <input
                type="number"
                id="investmentAmount"
                name="investmentAmount"
                value={formData.investmentAmount}
                onChange={handleInputChange}
                placeholder="Enter Investment Amount"
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
                <option value="Low Risk">Low</option>
                <option value="Low to Moderate Risk">Low to Moderate</option>
                <option value="Moderate Risk">Moderate</option>
                <option value="Moderately High Risk">Moderately High</option>
                <option value="High Risk">High</option>
                <option value="Very High Risk">Very High</option>
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
              <select
                id="returnPeriod"
                name="returnPeriod"
                value={formData.returnPeriod}
                onChange={handleInputChange}
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <option value="">---Select a Period---</option>
                <option value="1_year">1 Year</option>
                <option value="3_year">3 Year</option>
                <option value="5_year">5 Year</option>
              </select>
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

      {/* New Div Below Form - Recommendations */}
      {showOptions && (
        <div
          style={{
            width: "80%",
            maxWidth: "1000px",
            margin: "auto",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: "10px",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
            marginTop: "30px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Recommendations</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {recommendations.length > 0 ? (
              recommendations.map((option, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "20px",
                    borderRadius: "12px",
                    textAlign: "left",
                    fontWeight: "normal",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    width: "80%",
                    margin: "auto",
                    lineHeight: "1.8",
                  }}
                >
                  <a
                    href={option.detail_info} // Assuming you have a link field
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div>
                      <strong>Name:</strong> {option.name}
                    </div>
                    <div>
                      <strong>Category:</strong> {option.category}
                    </div>
                    <div>
                      <strong>Last NAV:</strong> ₹{option.last_nav}
                    </div>
                    <div>
                      <strong>1 Year Return:</strong> {option["1_year"]}%
                    </div>
                    <div>
                      <strong>3 Year Return:</strong> {option["3_year"]}%
                    </div>
                    <div>
                      <strong>5 Year Return:</strong> {option["5_year"]}%
                    </div>
                    <div>
                      <strong>SIP Available:</strong>{" "}
                      {option.sip_available ? "Yes" : "No"}
                    </div>
                    <div>
                      <strong>Lump Sum Available:</strong>{" "}
                      {option.lump_available ? "Yes" : "No"}
                    </div>
                    <div>
                      <strong>Volatility:</strong> {option.volatility}
                    </div>
                    <div>
                      <strong>Maturity Type:</strong> {option.maturity_type}
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <p>No recommendations found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommend;
