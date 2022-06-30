import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import {formatISO, format} from 'date-fns';


import { Modal } from "../../../components/Modal";

import { AiOutlineClose } from "react-icons/ai";
import { Container, Input } from "./style";



interface Loan {
  id: number;
  student: string;
  book: string;
  deliveryDate: string;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {   
    const deliveryFormatted = new Date(data.deliveryDate.replace(/-/g, '\/'));

    handleAddNewLoan({
      book: data.book,
      student: data.student,
      deliveryDate: formatISO(deliveryFormatted),
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
