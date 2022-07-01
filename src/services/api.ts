import axios from "axios";

export const LoanApi = axios.create({
  baseURL: "https://pw-backend-biblioteca.herokuapp.com/loans",
});
