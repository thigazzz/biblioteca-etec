import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Modal } from "../../../components/Modal";

import {Container, Input} from './style';

interface Loan {
  id: number;
  student: string;
  book: string;
  deliveryDate: Date;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Book {
  tombo: number;
  title: string;
  CDD: number;
  author: string;
  status: boolean;
  publisher: string;
}

interface handleAddBook {
  handleAddBook: (dataBook: Omit<Book, 'status'>) => void;
}

export const AddBook = () => {
    const navigate = useNavigate()
    const {handleAddBook} = useOutletContext<handleAddBook>()
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        handleAddBook({
          tombo: data.tombo,
          title: data.title,
          author: data.author,
          publisher: data.publisher,
          CDD: data.CDD,
        })

        navigate('/books')
    }

  return (
    <Modal>
      <AiOutlineClose
        className="close-modal-button"
        onClick={() => navigate("/books")}
      />
      <Container onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="book-tombo">Tombo do livro</label>
          <Input
            type="number"
            id="book-name"
            isError={errors.tombo}
            {...register("tombo", { required: "Preencha esse campo!" })}
          />
          {errors.tombo?.message && <small>{errors.tombo?.message}</small>}
        </div>
        <div className="input-container">
          <label htmlFor="book-name">Nome do livro</label>
          <Input
            type="text"
            id="book-name"
            isError={errors.title}
            {...register("title", { required: "Preencha esse campo!" })}
          />
          {errors.title?.message && <small>{errors.title?.message}</small>}
        </div>
        <div className="input-container">
          <label htmlFor="author-name">Nome do Autor</label>
          <Input
            type="text"
            id="author-name"
            isError={errors.author}
            {...register("author", { required: "Preencha esse campo!" })}
          />
          {errors.author?.message && (
            <small>{errors.author?.message}</small>
          )}
        </div>
        <div className="input-container">
          <label htmlFor="publisher-name">Nome da editora</label>
          <Input
            type="text"
            id="publisher-name"
            isError={errors.publisher}
            {...register("publisher", { required: "Preencha esse campo!" })}
          />
          {errors.publisher?.message && <small>{errors.publisher?.message}</small>}
        </div>
        <div className="input-container">
          <label htmlFor="cdd">CDD do livro</label>
          <Input
            type="number"
            id="cdd"
            isError={errors.CDD}
            {...register("CDD", { required: "Preencha esse campo!" })}
          />
          {errors.CDD?.message && <small>{errors.CDD?.message}</small>}
        </div>
        <div className="input-container">
          <input type="submit" value="Emprestar" />
        </div>
      </Container>
    </Modal>
  );
};
