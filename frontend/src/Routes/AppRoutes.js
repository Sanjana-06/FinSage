import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import MutualFundPage from "../Components/MutualFund/Home";
import Layout from "../Components/Layout";
import ProtectedRoute from "../Components/ProtectedRoute";
import Recommend from "../Components/MutualFund/Recommendation";
import AboutFund from "../Components/MutualFund/AboutFund";
import GoldPage from "../Components/Gold/Gold";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<Layout />}>
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/mutualfund" element={<MutualFundPage />} />
          <Route path="/mutualfund/recommendation" element={<Recommend />} />
          <Route path="/mutualfund/aboutfund" element={<AboutFund/>}/>
          <Route path="/gold" element={<GoldPage/>}/>
        {/* </Route> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
