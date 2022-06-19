import axios from "axios";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { Outlet, useNavigate } from "react-router-dom";

import { Table } from "../../components/Table";
import { BookItem } from "./BookItem";
import { Container } from "./style";

interface Book {
  id: number;
  bookName: string;
  author: string;
  publisher: string;
}

export const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/books").then(({ data }) => setBooks([...data.books]));
  }, []);

  const handleAddBook = async (dataBook: Omit<Book, 'id'>) => {
    console.log('******', dataBook)
    const {data} = await axios.post('/books/add', {
      ...dataBook
    }) 

    console.log(data)

    setBooks([...books, data.book])
  }

  const handleDeleteBook = async (id:number) => {
    const {data} = await axios.delete(`/books/${id}`)

    console.log(data)

    setBooks([...data.books])
  }

  const handleUpdateBook =async (dataBook: Omit<Book, 'id'>, id: number) => {
    const {data} = await axios.patch(`/books/${id}`, {
      ...dataBook
    })

    console.log(data)
    
    setBooks([...data.books])
  
  }
  return (
    <Container>
      <div className="center">
        <div className="info">
          <h1>Livros</h1>
          <button onClick={() => navigate("/books/add")}>Adicionar</button>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Nome do livro</th>
              <th>Autor</th>
              <th>Nome da editora</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                onDelete={handleDeleteBook}
                onUpdate={handleUpdateBook}
                // onConcluded={handleConcludedLoan}
              />
            ))}
          </tbody>
        </Table>
        <Outlet context={{ handleAddBook }}/>
      </div>
    </Container>
  );
};
