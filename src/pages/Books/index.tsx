import axios from "axios";
import { useEffect, useState } from "react";
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
                // onDelete={handleDeleteLoan}
                // onUpdate={handleUpdateLoan}
                // onConcluded={handleConcludedLoan}
              />
            ))}
          </tbody>
        </Table>
        <Outlet />
        {/* context={{ handleAddNewLoan }} */}
      </div>
    </Container>
  );
};
