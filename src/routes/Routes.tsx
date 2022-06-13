import { Routes, Route } from "react-router-dom";
import { Loans } from "../pages/Loans";
import { AddLoan } from "../pages/Loans/AddLoan";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/loans" element={<Loans />} >
        <Route path="/loans/add" element={<AddLoan/>}/>
      </Route>
    </Routes>
  );
};
