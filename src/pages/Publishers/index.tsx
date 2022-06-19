import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Table } from "../../components/Table";
import { PublisherItem } from "./PublisherItem";
import { Container } from "./style";

interface IPublisher {
  id: number;
  name: string;
  address: string;
  district: string;
  city: string;
  UF: string;
}

export const Publishers = () => {
  const [publishers, setPublishers] = useState<IPublisher[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/publishers').then(({data}) => setPublishers([...data.publishers]))
  }, []);

  const handleAddPublisher = async (data: Omit<IPublisher, 'id'>) => {
    await axios.post('/publishers/add', {
      ...data
    })
    await axios.get('/publishers').then(({data}) => setPublishers([...data.publishers]))
  }

  const handleDeletePublisher = async (id: number) => {
    await axios.delete(`/publishers/${id}`)

    await axios.get('/publishers').then(({data}) => setPublishers([...data.publishers]))
  }

  const handleUpdatePublisher = async (id:number, data: Omit<IPublisher, 'id'>) => {
    await axios.patch(`/publishers/${id}`, {
      ...data
    })
    await axios.get('/publishers').then(({data}) => setPublishers([...data.publishers]))
  }

  return (
    <Container>
      <div className="center">
        <div className="info">
          <h1>Editoras</h1>
          <button onClick={() => navigate("/publishers/add")}>Adicionar</button>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>UF</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {publishers.map((publisher) => (
              <PublisherItem
                key={publisher.id}
                publisher={publisher}
                onDelete={handleDeletePublisher}
                onUpdate={handleUpdatePublisher}
              />
            ))}
          </tbody>
        </Table>
        <Outlet  context={{ handleAddPublisher }}/>
      </div>
    </Container>
  );
};
