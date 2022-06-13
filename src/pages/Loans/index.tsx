import { Table } from "../../components/Table";

import { Container } from "./style";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoanItem } from "./LoanItem";

interface Loan {
  id: number;
  idBook: number;
  bookName: string;
  rm: number;
  studentName: string;
  deliveryDate: string;
  situation: boolean;
  dateAdt: string;
}

export const Loans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/loans").then(({ data }) => setLoans([...data.loans]));
  }, []);

  const handleAddNewLoan = async (dataLoan: Loan) => {
    const { data } = await axios.post("/loans/add", {
      ...dataLoan,
    });

    setLoans([...loans, data.loan]);

    console.log(loans);
  };

  const handleConcludedLoan = async (
    dataLoan: Omit<
      Loan,
      | "id"
      | "dateAdt"
      | "rm"
      | "idBook"
      | "bookName"
      | "rm"
      | "studentName"
      | "deliveryDate"
      | "dateAdt"
    >,
    id: number
  ) => {
    const { data } = await axios.post(`/loans/concluded/${id}`, {...dataLoan});

    console.log(data.loans)

    setLoans([...data.loans])

    console.log(loans)
  };

  const handleDeleteLoan = async (id: number) => {
    const { data } = await axios.delete(`/loans/${id}`);

    console.log(data.loans);

    setLoans([...data.loans]);
  };

  const handleUpdateLoan = async (
    dataLoan: Omit<Loan, "id" | "dateAdt" | "rm" | "idBook">,
    id: number
  ) => {
    const { data } = await axios.patch(`/loans/${id}`, {
      ...dataLoan,
    });

    console.log(data);

    setLoans([...data.loans]);
  };

  return (
    <Container>
      <div className="center">
        <div className="info">
          <h1>Empréstimos</h1>
          <button onClick={() => navigate("/loans/add")}>Adicionar</button>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Nome do livro</th>
              <th>Para</th>
              <th>Data de entrega</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <LoanItem
                key={loan.id}
                loan={loan}
                onDelete={handleDeleteLoan}
                onUpdate={handleUpdateLoan}
                onConcluded={handleConcludedLoan}
              />
            ))}
          </tbody>
        </Table>
        <Outlet context={{ handleAddNewLoan }} />
      </div>
    </Container>
  );
};
