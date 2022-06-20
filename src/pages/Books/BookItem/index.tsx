import { FormEventHandler, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import {useForm, FieldValues, SubmitHandler} from 'react-hook-form';
import {Container} from './style';

interface Book {
  tombo: number;
  title: string;
  CDD: number;
  author: string;
  status: boolean;
  publisher: string;
}

interface BookItemProps {
    book: Book;
    onDelete: (id: number) => void
    onUpdate: (id: number, data: Omit<Book, 'tombo' | 'status'>) => void
}
export const BookItem = ({book, onDelete, onUpdate}: BookItemProps) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
      defaultValues: {
        tombo: book.tombo,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        CDD: book.CDD
      }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        onUpdate(book.tombo, {
          author: data.author,
          title: data.title,
          publisher: data.publisher,
          CDD: data.CDD,
        })

        setIsEdit(false)
    }

    console.log(book.publisher, 'dsaaa')
    return (
        <Container >
      {!isEdit ? (
        <>
          <td>{book.tombo}</td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.publisher}</td>
          <td>{book.CDD}</td>
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
              onClick={() => onDelete(book.tombo)}
            />
          </td>
        </>
      ) : (
        <>
          <td>
            <input type="text" {...register("tombo")} readOnly/>
          </td>
          <td>
            <input type="text" {...register("title")} />
          </td>
          <td>
            <input type="text" {...register("author")} />
          </td>
          <td>
            <input type="text" {...register("publisher")} />
          </td>
          <td>
            <input type="text" {...register("CDD")} />
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