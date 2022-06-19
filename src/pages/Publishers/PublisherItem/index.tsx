import { useState } from "react";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Container } from "./style";

interface IPublisher {
  id: number;
  name: string;
  address: string;
  district: string;
  city: string;
  UF: string;
}

interface PublisherItemProps {
  publisher: IPublisher;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Omit<IPublisher, "id">) => void;
}

export const PublisherItem = ({
  publisher,
  onDelete,
  onUpdate,
}: PublisherItemProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: publisher.name,
      address: publisher.address,
      district: publisher.district,
      city: publisher.city,
      uf: publisher.UF,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    onUpdate(publisher.id, {
      name: data.name,
      address: data.address,
      district: publisher.district,
      city: data.city,
      UF: data.uf,
    });
    setIsEdit(false);
  };
  return (
    <Container>
      {!isEdit ? (
        <>
          <td>{publisher.name}</td>
          <td>{publisher.address}</td>
          <td>{publisher.district}</td>
          <td>{publisher.city}</td>
          <td>{publisher.UF}</td>
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
              onClick={() => onDelete(publisher.id)}
            />
          </td>
        </>
      ) : (
        <>
          <td>
            <input type="text" {...register("name", { required: true })} />
          </td>
          <td>
            <input type="text" {...register("address", { required: true })} />
          </td>
          <td>
            <input type="text" {...register("district", { required: true })} />
          </td>
          <td>
            <input type="text" {...register("city", { required: true })} />
          </td>
          <td>
            <input type="text" {...register("uf", { required: true })} />
          </td>
          <td>
            <button
              className="buttons edit"
              style={{ color: "yellow" }}
              onClick={handleSubmit(onSubmit)}
            >
              Editar
            </button>
          </td>
          <td>
            <AiFillDelete
              className="buttons"
              style={{ color: "red" }}
              onClick={() => onDelete(publisher.id)}
            />
          </td>
        </>
      )}
    </Container>
  );
};
