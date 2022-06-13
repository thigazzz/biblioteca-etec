import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import { useNavigate, useOutletContext } from "react-router-dom";

import { Modal } from "../../../components/Modal";

import { AiOutlineClose } from "react-icons/ai";
import { Container, Input } from "./style";

interface Loan {
  id: number;
  idBook: number;
  bookName: string;
  rm: number;
  studentName: string;
  deliveryDate: string;
  situation: boolean;
  dateAdt: string
}

type AddNewLoanData = Omit<Loan, "id" |'situation' |'dateAdt'>;

interface HandleAddLoan {
  handleAddNewLoan: (data: Loan) => void;
}

export const AddLoan = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const navigate = useNavigate();

  const {handleAddNewLoan} = useOutletContext<HandleAddLoan>()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const {idBook, bookName, rm, studentName, deliveryDate} = data

    console.log(deliveryDate)
    
    handleAddNewLoan({
      ...data,
      id: Math.random(),
      idBook,
      bookName,
      rm,
      studentName,
      deliveryDate: new Date(deliveryDate).toString(),
      situation: false,
      dateAdt: new Date().toString()
    })
    navigate("/loans");
  };

  return (
    <Modal>
      <AiOutlineClose
        className="close-modal-button"
        onClick={() => navigate("/loans")}
      />
      <Container onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="id-book">Codigo do livro</label>
          <Input
            type="number"
            id="id-book"
            isError={errors.bookId}
            {...register("idBook", { required: "Preencha esse campo!" })}
          />
          {errors.idBook?.message && <small>{errors.idBook?.message}</small>}
        </div>
        <div className="input-container">
          <label htmlFor="book-name">Nome do livro</label>
          <Input
            type="text"
            id="book-name"
            isError={errors.bookName}
            {...register("bookName", { required: "Preencha esse campo!" })}
          />
          {errors.bookName?.message && (
            <small>{errors.bookName?.message}</small>
          )}
        </div>
        <div className="input-container">
          <label htmlFor="rm">RM do aluno</label>
          <Input
            type="number"
            id="rm"
            isError={errors.rm}
            {...register("rm", { required: "Preencha esse campo!" })}
          />
          {errors.rm?.message && (
            <small>{errors.rm?.message}</small>
          )}
        </div>
        <div className="input-container">
          <label htmlFor="student-name">Nome do aluno</label>
          <Input
            type="text"
            id="student-name"
            isError={errors.studentName}
            {...register("studentName", { required: "Preencha esse campo!" })}
          />
          {errors.studentName?.message && (
            <small>{errors.studentName?.message}</small>
          )}
        </div>
        <div className="input-container">
          <label htmlFor="delivery-date">Date de entrega</label>
          <Input
            type="date"
            id="deliery-date"
            isError={errors.deliveryDate}
            {...register("deliveryDate", { required: "Preencha esse campo!" })}
          />
          {errors.deliveryDate?.message && (
            <small>{errors.deliveryDate?.message}</small>
          )}
        </div>
        <div className="input-container">
          <input type="submit" value="Emprestar" />
        </div>
      </Container>
    </Modal>
  );
};
