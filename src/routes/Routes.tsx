import { Routes, Route } from "react-router-dom";
import { Books } from "../pages/Books";
import { AddBook } from "../pages/Books/AddBook";
import { Loans } from "../pages/Loans";
import { AddLoan } from "../pages/Loans/AddLoan";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/loans" element={<Loans />} >
        <Route path="/loans/add" element={<AddLoan/>}/>
      </Route>
      <Route path="/books" element={<Books />} >
        <Route path="/books/add" element={<AddBook/>}/>
      </Route>
    </Routes>
  );
};
