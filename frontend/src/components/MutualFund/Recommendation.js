import React,{useState} from "react";

const Recommend = () => {
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
        paddingTop: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "rgba(10, 25, 50)",
        height: "100vh",
        color:"white",
        
      }}
    >
      <h1 style={{ textAlign: "left",paddingLeft:"9%",paddingBottom:"10px", }}>Mutual Fund Recommendation</h1>
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
          marginBottom:"15px",
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
                background: "#4bcd3e",
                color:"rgba(10, 25, 50)",
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
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
            width: "100%",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              width: "70%",
              padding: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
            }}
          ></div>
        </div>
            
      )}
    </div>
  );
};

export default Recommend;
