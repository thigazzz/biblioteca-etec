import { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {format} from 'date-fns';
import { formatISO, parseISO } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

import { AiFillCheckCircle, AiFillDelete, AiFillEdit } from "react-icons/ai";

import { Container } from "./style";

interface Loan {
  id: number;
  student: string;
  book: string;
  deliveryDate: string;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface LoanItemProps {
  loan: Loan;
  onDelete: (id: number) => void;
  onUpdate: (
    id: number,
    loanData: Pick<Loan, 'student' | 'book' | 'deliveryDate'>,
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
  } = useForm<FieldValues>();
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const dateDeliveryFormated = format(new Date(loan.deliveryDate), "EEEE'/'dd'/'MMMM", {
    locale: ptBR
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const deliveryFormatted = new Date(data.deliveryDate.replace(/-/g, '\/'));
    onUpdate(
      loan.id,
      {
        book: data.book,
        student: data.student,
        deliveryDate: formatISO(deliveryFormatted),
      },
    );

    setIsEdit(false);
  };

  return (
    <Container isConcluded={loan.situation} test={"#000"}>
      {!isEdit ? (
        <>
          <td>{loan.book}</td>
          <td>{loan.student}</td>
          <td>
            {dateDeliveryFormated.toString()}
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
            <input type="text" {...register('book')} placeholder={loan.book}/>
          </td>
          <td>
            <input type="text" {...register('student')} placeholder={loan.student}/>
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
