import { useState } from "react";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { AiFillCheckCircle, AiFillDelete, AiFillEdit } from "react-icons/ai";

import { Container } from "./style";

interface Loan {
  id: number;
  student: string;
  book: string;
  deliveryDate: Date;
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
    console.log(data.deliveryDate, 'bbbbbbbbbbbbbb')
    onUpdate(
      loan.id,
      {
        book: data.book,
        student: data.student,
        deliveryDate: data.deliveryDate,
      },
    );

    setIsEdit(false);
  };

  console.log(loan.deliveryDate)
  return (
    <Container isConcluded={loan.situation} test={"#000"}>
      {!isEdit ? (
        <>
          <td>{loan.book}</td>
          <td>{loan.student}</td>
          <td>
            {/* {new Intl.DateTimeFormat("pt-BR").format(
              new Date(loan.deliveryDate)
            )} */}
            {dateDeliveryFormated.toString()}
          {/* {new Date('2022-06-30').toString()} */}
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
