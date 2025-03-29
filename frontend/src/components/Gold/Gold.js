import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const GoldPage = () => {
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
        height:"100%",
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
          paddingLeft: "9%",
          paddingBottom:"10px",
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
      <h1 style={{ color: "gold", fontSize: "42px", textAlign: "center" }}>What is Gold Investment?</h1>
      
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ textAlign: "justify", fontSize: "20px", lineHeight: "1.6", width: "60%",textIndent: '2em' }}
        >
          Gold has been a valuable asset for centuries, serving as a medium of exchange and a store of wealth. Unlike paper currencies, which can be affected by inflation and economic fluctuations, gold maintains its intrinsic value over time. Investors often turn to gold as a hedge against inflation, currency devaluation, and geopolitical instability. Its scarcity and global demand make it a reliable option for wealth preservation and long-term security.
        </motion.p>

        <div style={{ width: "35%", height: "270px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis 
                dataKey="karat" 
                label={{ value: "Gold Karat", position: "insideBottom", dy: 10 }} 
                />
                <YAxis 
                label={{ value: "Gold Purity (%)", angle: -90,position: "insideLeft", dy: 45 }} 
                />
              <Tooltip />
              <Bar dataKey="purity" fill="gold" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        style={{ textAlign: "justify", fontSize: "20px", lineHeight: "1.6",textIndent: '2em' }}
      >
        One of the key advantages of gold investment is its ability to diversify a portfolio. Since gold has a low correlation with stocks and bonds, it acts as a financial cushion during market downturns. Many investors buy gold in different forms, including physical gold (bars, coins, and jewelry), exchange-traded funds (ETFs), and gold mining stocks. Each option provides varying levels of liquidity, accessibility, and risk management, catering to different investment strategies.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        style={{ textAlign: "justify", fontSize: "20px", lineHeight: "1.6",textIndent: '2em' }}
      >
        Despite its benefits, gold investment also has some challenges. Unlike stocks or bonds, gold does not generate passive income through dividends or interest. Additionally, physical gold requires secure storage, which can add extra costs. However, during economic crises, gold prices tend to rise as investors seek safe-haven assets. By carefully balancing gold with other investments, individuals can enhance their financial resilience while taking advantage of gold’s wealth-preserving qualities.
      </motion.p>
      </div>
    </div>
  );
};

export default GoldPage;
