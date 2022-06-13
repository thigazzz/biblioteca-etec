import { useState } from "react";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { AiFillCheckCircle, AiFillDelete, AiFillEdit } from "react-icons/ai";

import { Container } from "./style";

interface Loan {
  id: number;
  idBook: number;
  bookName: string;
  rm: number;
  studentName: string;
  deliveryDate: string;
  situation: boolean;
}

interface LoanItemProps {
  loan: Loan;
  onDelete: (id: number) => void;
  onUpdate: (
    loanData: Omit<Loan, "id" | "dateAdt" | "rm" | "idBook">,
    id: number
  ) => void;
  onConcluded: (
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
  ) => void;
}

export const LoanItem = ({
  loan,
  onDelete,
  onUpdate,
  onConcluded,
}: LoanItemProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      bookName: loan.bookName,
      studentName: loan.studentName,
      deliveryDate: new Intl.DateTimeFormat("pt-BR").format(
        new Date(loan.deliveryDate)
      ),
    },
  });
  const [isEdit, setIsEdit] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { bookName, studentName, deliveryDate, situation } = data;

    onUpdate(
      {
        bookName,
        studentName,
        deliveryDate: new Date(deliveryDate).toString(),
        situation,
      },
      loan.id
    );

    setIsEdit(false);
  };
  return (
    <Container isConcluded={loan.situation} test={'#000'}>
      {!isEdit ? (
        <>
          <td>{loan.bookName}</td>
          <td>{loan.studentName}</td>
          <td>
            {new Intl.DateTimeFormat("pt-BR").format(
              new Date(loan.deliveryDate)
            )}
          </td>
          <td>
            <AiFillEdit
              className="buttons"
              style={{ color: "yellow" }}
              onClick={() => setIsEdit(true)}
            />
          </td>
          <td>
            <AiFillDelete
              className="buttons"
              style={{ color: "red" }}
              onClick={() => onDelete(loan.id)}
            />
          </td>
          <td>
            <AiFillCheckCircle
              className="buttons"
              style={{ color: "green" }}
              onClick={() =>
                onConcluded({ situation: !loan.situation }, loan.id)
              }
            >
              Concluido
            </AiFillCheckCircle>
          </td>
        </>
      ) : (
        <>
          <td>
            <input type="text" {...register("bookName")} />
          </td>
          <td>
            <input type="text" {...register("studentName")} />
          </td>
          <td>
            <input type="date" {...register("deliveryDate")} />
          </td>
          <td>
            <button onClick={handleSubmit(onSubmit)} className="buttons edit">
              Editar
            </button>
          </td>
        </>
      )}
    </Container>
  );
};
