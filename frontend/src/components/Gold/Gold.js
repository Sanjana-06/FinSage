import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { LineChart, Line } from "recharts";

const GoldPage = () => {
  const historicalData = {
    "1Y": [
      { month: "2025-01", historical: 1800 },
      { month: "2025-02", historical: 1820 },
      { month: "2025-03", historical: 1900 },
      { month: "2025-04", historical: 1920 },
      { month: "2025-05", historical: 1950 },
      { month: "2025-06", historical: 1970 },

      { month: "2025-07", predicted: 2222 },
      { month: "2025-08", predicted: 4532 },
      { month: "2025-09", predicted: 5436 },
      { month: "2025-10", predicted: 6546 },
      { month: "2025-11", predicted: 7446 },
      { month: "2025-12", predicted: 8656 },
    ],
    "3Y": [
      { month: "2022", historical: 1700, predicted: 1800 },
      // Similar structure for 3 years
      { month: "2023", historical: 1750, predicted: 1850 },
      { month: "2024", historical: 1800, predicted: 1900 },
    ],
    "5Y": [
      { month: "2019", historical: 1500, predicted: 1600 },
      { month: "2020", historical: 1600, predicted: 1700 },
      { month: "2021", historical: 1650, predicted: 1750 },
      { month: "2022", historical: 1700, predicted: 1800 },
      { month: "2023", historical: 1750, predicted: 1850 },
    ],
  };

  const [showGraph, setShowGraph] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("1Y");

  const data = [
    { karat: "24K", purity: 99.9 },
    { karat: "22K", purity: 91.6 },
    { karat: "18K", purity: 75.0 },
    { karat: "14K", purity: 58.3 },
    { karat: "10K", purity: 41.7 },
  ];
  const [formData, setFormData] = useState({
    income: "",
    Karat: "Select Karat",
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
        height: "auto",
        overflow: "hidden",
        backgroundColor: "rgba(10, 25, 50)",
      }}
    >
      {/* Greeting */}
      <h1
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "left",
          fontSize: "2.5rem",
          color: "white",
          paddingLeft: "10%",
          paddingBottom: "10px",
        }}
      >
        Gold Investment
      </h1>
      <div
        style={{
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          margin: "0% 10%",
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
            {/* Investment Input */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
                htmlFor="Investment"
              >
                Investment Amount
              </label>
              <input
                type="number"
                id="Investment"
                name="Investment"
                value={formData.investment}
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

            {/* Karat Selection */}
            <div style={{ textAlign: "left", flex: "1" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
                htmlFor="karat"
              >
                Karat
              </label>
              <select
                id="karat"
                name="karat"
                value={formData.karat}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <option value="Select karat">---Select---</option>
                <option value="24">24</option>
                <option value="22">22</option>
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
                <option value="">---Select a Period---</option>
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">1 Year</option>
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
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
            }}
          >
            {showGraph && (
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <h2>Gold Price Trends ({selectedPeriod})</h2>
                <ResponsiveContainer width="90%" height={300}>
                  <LineChart data={historicalData[selectedPeriod]}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="historical"
                      stroke="blue"
                      strokeWidth={2}
                      name="Historical"
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="red"
                      strokeWidth={2}
                      name="Predicted"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div style={{ marginTop: "20px" }}>
                  <button
                    onClick={() => setSelectedPeriod("1Y")}
                    style={{ margin: "5px" }}
                  >
                    1Y
                  </button>
                  <button
                    onClick={() => setSelectedPeriod("3Y")}
                    style={{ margin: "5px" }}
                  >
                    3Y
                  </button>
                  <button
                    onClick={() => setSelectedPeriod("5Y")}
                    style={{ margin: "5px" }}
                  >
                    5Y
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gold Investment Description */}
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
        <h1 style={{ color: "gold", fontSize: "30px", textAlign: "center" }}>
          What is Gold Investment?
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              textAlign: "justify",
              fontSize: "16px",
              lineHeight: "1.6",
              width: "60%",
            }}
          >
            Gold has been a valuable asset for centuries, serving as a medium of
            exchange and a store of wealth. Unlike paper currencies, which can
            be affected by inflation and economic fluctuations, gold maintains
            its intrinsic value over time. Investors often turn to gold as a
            hedge against inflation, currency devaluation, and geopolitical
            instability. Its scarcity and global demand make it a reliable
            option for wealth preservation and long-term security.
            <br /> <br />
            One of the key advantages of gold investment is its ability to
            diversify a portfolio. Since gold has a low correlation with stocks
            and bonds, it acts as a financial cushion during market downturns.
            Many investors buy gold in different forms, including physical gold
            (bars, coins, and jewelry), exchange-traded funds (ETFs), and gold
            mining stocks. Each option provides varying levels of liquidity,
            accessibility, and risk management, catering to different investment
            strategies.
          </motion.p>

          <div style={{ width: "35%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis
                  dataKey="karat"
                  label={{
                    value: "Gold Karat",
                    position: "insideBottom",
                    dy: 10,
                  }}
                />
                <YAxis
                  label={{
                    value: "Gold Purity (%)",
                    angle: -90,
                    position: "insideLeft",
                    dy: 45,
                  }}
                />
                <Tooltip />
                <Bar dataKey="purity" fill="gold" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        ></div>

        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{
            textAlign: "justify",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          Despite its benefits, gold investment also has some challenges. Unlike
          stocks or bonds, gold does not generate passive income through
          dividends or interest. Additionally, physical gold requires secure
          storage, which can add extra costs. However, during economic crises,
          gold prices tend to rise as investors seek safe-haven assets. By
          carefully balancing gold with other investments, individuals can
          enhance their financial resilience while taking advantage of gold’s
          wealth-preserving qualities.
        </motion.p>
      </div>
      <h2 style={{ fontSize: "30px", color: "#4bcd3e", marginBottom: "10px" }}>
        Related Links
      </h2>
      <ul
        style={{
          color: "white",
          paddingLeft: "20px", // Keep indentation for bullets
          marginLeft: 0,
          display: "flex",
          gap: "30px",
          textAlign: "center",
          justifyContent: "center", // Adds space between items
        }}
      >
        <li>
          <a
            href="https://groww.in/p/gold-investment"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "18px",
              color: "white",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Groww.com
          </a>
        </li>
        <li>
          <a
            href="https://www.bankbazaar.com/gold-rate/gold-schemes-by-jewellers-and-banks.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "18px", color: "white", textDecoration: "none" }}
          >
            BankBazaar.com
          </a>
        </li>
        <li>
          <a
            href="https://cleartax.in/s/gold-investment"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "18px", color: "white", textDecoration: "none" }}
          >
            ClearTax.com
          </a>
        </li>
      </ul>
    </div>
  );
};

export default GoldPage;
