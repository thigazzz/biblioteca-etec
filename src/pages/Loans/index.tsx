import { Table } from "../../components/Table";

import { Container } from "./style";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoanItem } from "./LoanItem";

interface Loan {
  id: number;
  tombo_book: number;
  id_student: number;
  id_employee: number;
  studentName: string;
  deliveryDate: string;
  situation: boolean;
  dateAdt: string;
  description: string;
}

export const Loans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/loans").then(({ data }) => setLoans([...data.loans]));
  }, []);

  const handleAddNewLoan = async (dataLoan: Pick<Loan, 'tombo_book' | 'id_student' | 'deliveryDate'>) => {
    const { data } = await axios.post("/loans/add", {
      ...dataLoan,
    });

    setLoans([...loans, data.loan]);
  };

  const handleConcludedLoan = async (
    id: number,
    dataLoan: Pick<Loan, 'situation'>,
  ) => {
    await axios.post(`/loans/concluded/${id}`, {...dataLoan});

    await axios.get("/loans").then(({ data }) => setLoans([...data.loans]));
  };

  const handleDeleteLoan = async (id: number) => {
    await axios.delete(`/loans/${id}`);

    await axios.get("/loans").then(({ data }) => setLoans([...data.loans]));
  };

  const handleUpdateLoan = async (
    id: number,
    dataLoan: Pick<Loan, 'deliveryDate'>,
  ) => {
    const {data} = await axios.patch(`/loans/${id}`, {
      ...dataLoan,
    });

    await axios.get("/loans").then(({ data }) => setLoans([...data.loans]));
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
              <th>Código do livro</th>
              <th>Código do aluno</th>
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
