import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, ChevronDown, BarChart3, Newspaper,Bot,TrendingUp } from "lucide-react";


const Navbar = () => {
  const [isInvestmentOpen, setIsInvestmentOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <div style={styles.navLinks}>
            <Link to="/chatbot" style={styles.navItem}>
              <Bot size={25} /> ChatBot
            </Link>
          <div
            style={styles.navItem}
            onMouseEnter={() => setIsInvestmentOpen(true)}
            onMouseLeave={() => setIsInvestmentOpen(false)}
          >
            
            <button style={styles.navBtn}>
            <TrendingUp size={18} /> Investment Plan <ChevronDown size={16} />
            </button>
            {isInvestmentOpen && (
              <div style={styles.dropdown}>
                <Link to="/mutualfund" style={styles.dropdownItem}>
                  Mutual Fund
                </Link>
                <Link to="/fixed-deposit" style={styles.dropdownItem}>
                  Fixed Deposit
                </Link>
                <Link to="/recurring-deposit" style={styles.dropdownItem}>
                  Recurring Deposit
                </Link>
                <Link to="/gold" style={styles.dropdownItem}>
                  Gold
                </Link>
                <Link to="/stocks" style={styles.dropdownItem}>
                  Stocks
                </Link>
              </div>
            )}
          </div>

          <Link to="/expense-tracker" style={styles.navItem}>
            <BarChart3 size={18} /> Expense Tracker
          </Link>
          <div
            style={styles.navItem}
            onMouseEnter={() => setIsNewsOpen(true)}
            onMouseLeave={() => setIsNewsOpen(false)}
          >
            <button style={styles.navBtn}>
              <Newspaper size={18} /> News <ChevronDown size={16} />
            </button>
            {isNewsOpen && (
              <div style={styles.dropdown}>
                <Link to="/news/general" style={styles.dropdownItem}>
                  Trending
                </Link>
                <Link to="/news/gold" style={styles.dropdownItem}>
                  Gold{" "}
                </Link>
                <Link to="/news/stocks" style={styles.dropdownItem}>
                  Stock
                </Link>
                <Link to="/news/mutual-fund" style={styles.dropdownItem}>
                  MutualFund
                </Link>
              </div>
            )}
          </div>

          <div
            style={styles.navItem}
            onMouseEnter={() => setIsUserOpen(true)}
            onMouseLeave={() => setIsUserOpen(false)}
          >
            <button style={styles.navBtn}>
              <User size={20} />
            </button>
            {isUserOpen && (
              <div style={styles.profileDropdown}>
                {" "}
                {/* Use profileDropdown here */}
                <Link to="/account" style={styles.dropdownItem}>
                  Account
                </Link>
                <Link to="/logout" style={styles.dropdownItem}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>

        <button style={styles.menuBtn}>
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#4bcd3e",
    paddingTop: "5px",
    paddingBottom: "8px",
    display: "flex",
    justifyContent: "right",
    boxShadow: "0px 4px 12px rgba(0, 0, 255, 0.6)",
    height: "5vh",
  },
  navContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "right",
    width: "90%",
    maxWidth: "1200px",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  navItem: {
    position: "relative",
    color: "rgba(10, 25, 50)",
    textDecoration: "none",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  navBtn: {
    background: "none",
    border: "none",
    color: "rgba(10, 25, 50)",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: "0", // Change this to align the profile dropdown to the left
    background: "rgba(10, 25, 50)",
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    padding: "10px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
    zIndex: "10",
    width: "120px",
  },
  dropdownItem: {
    color: "white",
    padding: "4px 2px",
    textDecoration: "none",
    fontSize: "14px",
  },
  profileDropdown: {
    position: "absolute",
    top: "100%",
    right: "0",
    background: "rgba(10, 25, 50)",
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    padding: "5px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
    zIndex: "10",
    width: "90px",
    color:"white",
  },
  menuBtn: {
    display: "none",
    background: "none",
    border: "none",
    color: "white",
  },
};

export default Navbar;
