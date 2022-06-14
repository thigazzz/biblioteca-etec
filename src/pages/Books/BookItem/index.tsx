import { FormEventHandler, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import {useForm, FieldValues, SubmitHandler} from 'react-hook-form';
import {Container} from './style';

interface Book {
    id: number;
  bookName: string;
  author: string;
  publisher: string;
}

interface BookItemProps {
    book: Book
}
export const BookItem = ({book}: BookItemProps) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const {bookName, author, publisher} = data
    }
    return (
        <Container >
      {!isEdit ? (
        <>
          <td>{book.bookName}</td>
          <td>{book.author}</td>
          <td>{book.publisher}</td>
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
            //   onClick={() => onDelete(loan.id)}
            />
          </td>
        </>
      ) : (
        <>
          <td>
            <input type="text" {...register("bookName")} />
          </td>
          <td>
            <input type="text" {...register("author")} />
          </td>
          <td>
            <input type="text" {...register("publisher")} />
          </td>
          <td>
            <button onClick={handleSubmit(onSubmit)} className="buttons edit">
              Editar
            </button>
          </td>
        </>
      )}
    </Container>
    )
}