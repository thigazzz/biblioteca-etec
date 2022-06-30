import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import { useNavigate, useOutletContext } from "react-router-dom";

import { Modal } from "../../../components/Modal";

import { AiOutlineClose } from "react-icons/ai";
import { Container, Input } from "./style";
import { ReactNode, useEffect, useState } from "react";

interface Loan {
  id: number;
  student: string;
  book: string;
  deliveryDate: Date;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// interface Book {
//   tombo: number;
//   title: string;
//   CDD: number;
//   author: string;
//   status: boolean;
//   publisher: string;
// }

interface HandleAddLoan {
  handleAddNewLoan: (dataLoan: Pick<Loan, 'student' | 'book' | 'deliveryDate'>) => void;
}

export const AddLoan = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const navigate = useNavigate();
  const {handleAddNewLoan} = useOutletContext<HandleAddLoan>()
  // const [books, setBooks] = useState<Book[]>([]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {    
    handleAddNewLoan({
      book: data.book,
      student: data.student,
      deliveryDate: new Date(data.deliveryDate),
    })
    navigate("/loans");
  };

  // useEffect(() => {
  //   axios.get('/books').then(({data}) => setBooks([...data.books]))
  // }, []);

  return (
    <Modal>
      <AiOutlineClose
        className="close-modal-button"
        onClick={() => navigate("/loans")}
      />
      <Container onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="book">Nome do livro</label>
          <Input
            type="text"
            id="book"
            isError={errors.book}
            {...register("book", { required: "Preencha esse campo!" })}
          />
          {errors.book?.message && <small>{errors.book?.message}</small>}
        </div>
        <div className="input-container">
          <label htmlFor="student">Nome do aluno</label>
          <Input
            type="text"
            id="student"
            isError={errors.student}
            {...register("student", { required: "Preencha esse campo!" })}
          />
          {errors.student?.message && (
            <small>{errors.student?.message}</small>
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
