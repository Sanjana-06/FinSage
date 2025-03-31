import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const FDPage = () => {
  const [fdResults, setFdResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [filterText, setFilterText] = useState(""); // State for dynamic filter

  // Pagination logic
  const totalPages = Math.ceil(fdResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Apply filtering before pagination
  const filteredResults = fdResults.filter((plan) =>
    plan.Bank.toLowerCase().includes(filterText.toLowerCase())
  );
  const currentData = filteredResults.slice(startIndex, endIndex);

  const [formData, setFormData] = useState({
    amount: "",
    term: "",
  });

  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input fields
    if (!formData.amount || !formData.term) {
      console.error("Missing input fields");
      return;
    }

    const payload = {
      amount: Number(formData.amount),
      term: Number(formData.term),
    };

    console.log("Sending payload:", payload);

    try {
      const response = await fetch("http://localhost:5000/api/fd-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received Data:", data);

      setFdResults(data);
      setShowOptions(data.length > 0); // Show options only if there are results
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        paddingTop: "20px",
        fontFamily: "Arial, sans-serif",
        height: "auto",
        overflow: "hidden",
        backgroundColor: "rgba(10, 25, 50)",
      }}
    >
      <h1
        style={{
          display: "flex",
          justifyContent: "left",
          fontSize: "2.5rem",
          color: "white",
          paddingLeft: "9%",
          paddingBottom: "10px",
        }}
      >
        Fixed Deposit
      </h1>

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
            {/* Investment Amount Input */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
                htmlFor="amount"
              >
                Investment amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter investment amount"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              />
            </div>

            {/* Return Period Input */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
                htmlFor="term"
              >
                Return Period
              </label>
              <select
                id="term"
                name="term"
                value={formData.term}
                onChange={handleInputChange}
                required
                style={{
                  width: "95%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  color: "#333",
                  cursor: "pointer",
                  appearance: "none",
                }}
              >
                <option value="">---Select a term---</option>
                <option value="1">1 Year</option>
                <option value="3">3 Years</option>
                <option value="5">5 Years</option>
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

      {showOptions && (
        <div
          style={{
            width: "90%",
            maxWidth: "900px",
            margin: "30px auto",
            padding: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "15px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(15px)",
            textAlign: "center",
          }}
        >
          {/* Dynamic Filter */}
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search by Bank Name..."
            style={{
              display: "block",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "30%",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          />

          {/* Fixed Header Card */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
              borderRadius: "10px",
              backgroundColor: "#4bcd3e",
              fontWeight: "bold",
              fontSize: "18px",
              color: "black",
              marginBottom: "10px",
            }}
          >
            <p style={{ flex: 1, textAlign: "left" }}>Bank Name</p>
            <p style={{ flex: 1, textAlign: "center" }}>Interest Rate (%)</p>
            <p style={{ flex: 1, textAlign: "right" }}>Maturity Amount</p>
          </div>

          {/* Dynamic Data in Cards */}
          {currentData.map((plan, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "white",
                fontWeight: "bold",
                fontSize: "16px",
                color: "black",
                marginBottom: "10px",
              }}
            >
              <p style={{ flex: 1, textAlign: "left" }}>{plan.Bank}</p>
              <p style={{ flex: 1, textAlign: "center" }}>
                {plan["Interest Rate (%)"]}%
              </p>
              <p style={{ flex: 1, textAlign: "right" }}>
                ₹{plan["Maturity Amount"]}
              </p>
            </div>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && fdResults.length > itemsPerPage && (
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  textAlign: "center",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  border: "none",
                  background: "#4bcd3e",
                  color: "black",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Prev
              </button>

              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "white",
                  paddingTop: "7px",
                }}
              >
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                style={{
                  padding: "10px 15px",
                  borderRadius: "5px",
                  border: "none",
                  background: "#4bcd3e",
                  color: "black",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Fixed Deposit Description */}
      <div
        style={{
          width: "80%",
          margin: "auto",
          marginTop: "20px",
          padding: "15px",
          borderRadius: "10px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#4bcd3e", fontSize: "42px", textAlign: "center" }}>
          What is Fixed Deposit?
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            textAlign: "justify",
            fontSize: "20px",
            lineHeight: "1.6",
            width: "100%", // Increased width
            maxWidth: "1000px", // Prevents overflow
            margin: "0 auto 0 1%", // Centers the paragraph
            padding: "10px", // Adds some space around
            color: "white", // Ensures visibility
          }}
        >
          A Fixed Deposit (FD) is a financial instrument offered by banks and
          financial institutions that allows individuals to deposit a lump sum
          of money for a predetermined period at a fixed interest rate. Unlike
          regular savings accounts, FDs provide higher interest rates, making
          them a popular choice for risk-averse investors looking for stable and
          guaranteed returns. These deposits are straightforward to open and
          come with minimal administrative requirements, which appeals to a
          broad range of investors. Many banks offer schemes that cater to
          specific demographics, such as senior citizens, providing them with
          even better returns. FDs are also insulated from market volatility,
          ensuring a safe and predictable growth of savings.
          <br /> <br />
          The key advantage of a Fixed Deposit is the guaranteed return on
          investment, as the interest rate remains fixed for the entire duration
          of the deposit. This makes it an ideal option for individuals who
          prioritize security over high-risk investments. The fixed rate shields
          investors from fluctuations in interest rates, providing them peace of
          mind throughout the deposit tenure. Many banks also offer flexible
          tenure options ranging from a few months to several years, allowing
          customers to tailor their deposits to their financial goals.
          Additionally, the predictable nature of returns makes FDs an excellent
          tool for planning future expenses, such as education, travel, or home
          renovations.
          <br /> <br />
          Additionally, some banks allow premature withdrawals, though they may
          come with penalty charges. While penalties may slightly reduce
          returns, the ability to access funds during emergencies adds a layer
          of liquidity to the investment. Fixed Deposits can also be used as
          collateral for loans, offering financial flexibility to investors
          without having to break their deposits. By using FDs as security,
          borrowers can avail of loans at lower interest rates compared to
          unsecured personal loans. Furthermore, certain banks provide
          nomination facilities, ensuring the smooth transfer of funds to
          beneficiaries in unforeseen circumstances. These features make FDs
          versatile and efficient savings instruments for a variety of needs
        </motion.p>
      </div>
    </div>
  );
};

export default FDPage;
