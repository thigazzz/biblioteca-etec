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
  tombo_book: number;
  id_student: number;
  id_employee: number;
  studentName: string;
  deliveryDate: string;
  situation: boolean;
  dateAdt: string;
  description: string;
}

interface LoanItemProps {
  loan: Loan;
  onDelete: (id: number) => void;
  onUpdate: (
    id: number,
    loanData: Pick<Loan, 'deliveryDate'>,
  ) => void;
  onConcluded: (id: number, dataLoan: Pick<Loan, "situation">) => void;
}

export const LoanItem = ({
  loan,
  onDelete,
  onUpdate,
  onConcluded,
}:
  
LoanItemProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      deliveryDate: new Intl.DateTimeFormat("pt-BR").format(
        new Date(loan.deliveryDate)
      ),
    },
  });
  const [isEdit, setIsEdit] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    onUpdate(
      loan.id,
      {
        deliveryDate: new Date(data.deliveryDate).toString(),
      },
    );

    setIsEdit(false);
  };
  return (
    <Container isConcluded={loan.situation} test={"#000"}>
      {!isEdit ? (
        <>
          <td>{loan.tombo_book}</td>
          <td>{loan.id_student}</td>
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
                onConcluded(loan.id,{ situation: !loan.situation }, )
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>
            {loan.tombo_book}
          </td>
          <td>
            {loan.id_student}
          </td>
          <td>
            <input type="date" {...register("deliveryDate")} />
          </td>
          <td>
            <button onClick={handleSubmit(onSubmit)} className="buttons edit">
              Editar
            </button>
          </td>
          <td>
            <AiFillDelete
              className="buttons"
              style={{ color: "red" }}
              onClick={() => onDelete(loan.id)}
            />
          </td>
        </>
      )}
    </Container>
  );
};
