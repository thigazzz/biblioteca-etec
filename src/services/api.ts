import axios from "axios";

export const LoanApi = axios.create({
  baseURL: "http://localhost:8080/loans",
});
