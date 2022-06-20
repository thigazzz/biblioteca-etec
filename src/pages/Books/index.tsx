import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Table } from "../../components/Table";
import { BookItem } from "./BookItem";
import { Container } from "./style";

interface Book {
  tombo: number;
  title: string;
  CDD: number;
  author: string;
  status: boolean;
  publisher: string;
}

export const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/books").then(({ data }) => setBooks([...data.books]));
  }, []);

  const handleAddBook = async (dataBook: Omit<Book, "status">) => {
    await axios.post("/books/add", {
      ...dataBook,
    });

    await axios.get("/books").then(({ data }) => setBooks([...data.books]));
  };

  const handleDeleteBook = async (id: number) => {
    await axios.delete(`/books/${id}`);

    await axios.get("/books").then(({ data }) => setBooks([...data.books]));
  };

  const handleUpdateBook = async (
    id: number,
    data: Omit<Book, "tombo" | "status">
  ) => {
    await axios.patch(`/books/${id}`, {
      ...data,
    });

    await axios.get("/books").then(({ data }) => setBooks([...data.books]));
  };
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
              <th>Tombo do livro</th>
              <th>Nome do livro</th>
              <th>Autor</th>
              <th>Nome da editora</th>
              <th>Número do CDD</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <BookItem
                key={book.tombo}
                book={book}
                onDelete={handleDeleteBook}
                onUpdate={handleUpdateBook}
              />
            ))}
          </tbody>
        </Table>
        <Outlet context={{ handleAddBook }} />
      </div>
    </Container>
  );
};
