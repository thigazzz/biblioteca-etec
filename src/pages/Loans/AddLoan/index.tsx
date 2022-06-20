import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import { useNavigate, useOutletContext } from "react-router-dom";

import { Modal } from "../../../components/Modal";

import { AiOutlineClose } from "react-icons/ai";
import { Container, Input } from "./style";

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

interface HandleAddLoan {
  handleAddNewLoan: (dataLoan: Pick<Loan, 'tombo_book' | 'id_student' | 'deliveryDate'>) => void;
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
    handleAddNewLoan({
      tombo_book: data.tomboBook,
      id_student: data.idStudent,
      deliveryDate: data.deliveryDate,
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
          <label htmlFor="tombo-book">Codigo do livro</label>
          <Input
            type="number"
            id="tombo-book"
            isError={errors.tomboBook}
            {...register("tomboBook", { required: "Preencha esse campo!" })}
          />
          {errors.tomboBook?.message && <small>{errors.tomboBook?.message}</small>}
        </div>
        <div className="input-container">
          <label htmlFor="rm">RM do aluno</label>
          <Input
            type="number"
            id="rm"
            isError={errors.idStudent}
            {...register("idStudent", { required: "Preencha esse campo!" })}
          />
          {errors.idStudent?.message && (
            <small>{errors.idStudent?.message}</small>
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
