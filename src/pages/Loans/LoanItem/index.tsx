import { useState } from "react";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

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
  onUpdate: (loanData: Omit<Loan, 'id' | 'dateAdt' | 'rm' | 'idBook'>, id: number) => void;
  onConcluded: (dataLoan: Omit<
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
  id: number) => void;
}

export const LoanItem = ({ loan, onDelete, onUpdate, onConcluded }: LoanItemProps) => {
  const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
      bookName: loan.bookName,
      studentName: loan.studentName,
      deliveryDate: new Intl.DateTimeFormat('pt-BR').format(new Date(loan.deliveryDate)),
      situation: loan.situation ? 'Concluido' : 'Pendente'
    }
  })
  const [isEdit, setIsEdit] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const {bookName, studentName, deliveryDate, situation} = data

    onUpdate({
      bookName,
      studentName,
      deliveryDate: new Date(deliveryDate).toString(),
      situation,
    }, loan.id)

    setIsEdit(false)
  }
  return (
    <tr>
      {!isEdit ? (
        <>
          <td>{loan.bookName}</td>
          <td>{loan.studentName}</td>
          <td>
            {new Intl.DateTimeFormat("pt-BR").format(
              new Date(loan.deliveryDate)
            )}
          </td>
          <td>{loan.situation ? 'Concluido' : 'Pendente'}</td>
          <td>
            <AiFillEdit
              style={{ color: "yellow" }}
              onClick={() => setIsEdit(true)}
            />
          </td>
          <td>
            <AiFillDelete
              style={{ color: "red" }}
              onClick={() => onDelete(loan.id)}
            />
          </td>
          <td>
            <button
              style={{ color: "green" }}
              onClick={() => onConcluded({situation: !loan.situation}, loan.id)}
            >Concluido</button>
          </td>
        </>
      ) : (
        <>
          <td>
            <input type="text" {...register('bookName')} />
          </td>
          <td>
            <input type="text" {...register('studentName')} />
          </td>
          <td>
            <input
              type="date"
              {...register('deliveryDate')}
            />
          </td>
          <td>
            <input type="text" {...register('situation')} />
          </td>
          <td>
            <button onClick={handleSubmit(onSubmit)}>Editar</button>
          </td>
          <td>
            <AiFillDelete
              style={{ color: "red" }}
              onClick={() => onDelete(loan.id)}
            />
          </td>
        </>
      )}
    </tr>
  );
};
