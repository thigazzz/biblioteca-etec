import { Table } from "../../components/Table";

import { Container } from "./style";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoanItem } from "./LoanItem";
import { LoanApi } from "../../services/api";

interface Loan {
  id: number;
  student: string;
  book: string;
  deliveryDate: string;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const Loans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    LoanApi.get("/").then(({ data }: any) => setLoans([...data.data]));
  }, []);

  const handleAddNewLoan = async (dataLoan: Pick<Loan, 'student' | 'book' | 'deliveryDate'>) => {

    const { data } = await LoanApi.post("/create", {
      ...dataLoan,
    });

    setLoans([...loans, data.data]);

  };

  const handleConcludedLoan = async (
    id: number,
    dataLoan: Pick<Loan, 'situation'>,
  ) => {
    await LoanApi.patch(`/${id}`, {...dataLoan});

    const newLoans = loans.map(loan => {
      if (id === loan.id) {
        const newLoan = {
          ...loan,
          situation: dataLoan.situation
        }
        return newLoan
      }

      return loan
    })

    setLoans([...newLoans])
  };

  const handleDeleteLoan = async (id: number) => {
    await LoanApi.delete(`/${id}`);

    const newLoans = loans.filter(loan => loan.id !== id)

    setLoans([...newLoans])
  };

  const handleUpdateLoan = async (
    id: number,
    dataLoan: Pick<Loan, 'student' | 'book' | 'deliveryDate'>,
  ) => {
    console.log(new Date(dataLoan.deliveryDate), 'aaaaaaaa')

    await LoanApi.put(`/${id}`, {
      ...dataLoan,
    });

    const newLoans = loans.map(loan => {
      if (id === loan.id) {
        const newLoan = {
          ...loan,
          book: dataLoan.book,
          student: dataLoan.student,
          deliveryDate: dataLoan.deliveryDate
        }
        return newLoan
      }

      return loan
    })


    setLoans([...newLoans])
  };

  return (
    <Container>
      <div className="center">
        <div className="info">
          <h1>Empréstimos</h1>
          <button onClick={() => navigate("/loans/create")}>Adicionar</button>
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
        <Outlet  context={{ handleAddNewLoan }}/>  
      </div>
    </Container>
  );
};
