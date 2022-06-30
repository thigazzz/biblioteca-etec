import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Loans } from "../pages/Loans";
import { AddLoan } from "../pages/Loans/AddLoan";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loans" element={<Loans />}>
        <Route path="/loans/create" element={<AddLoan />} />
      </Route>
    </Routes>
  );
};

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/loans");
  }, []);
  return <h1>.</h1>;
};
