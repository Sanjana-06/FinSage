import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MutualFundPage from "./components/MutualFund/home";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/mutualfund" element={<MutualFundPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
