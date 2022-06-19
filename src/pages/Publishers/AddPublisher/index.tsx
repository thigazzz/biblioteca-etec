import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Modal } from "../../../components/Modal";
import { Container, Input } from "./style";

interface IPublisher {
  id: number;
  name: string;
  address: string;
  district: string;
  city: string;
  UF: string;
}

interface handleAddPublisher {
  handleAddPublisher: (data: Omit<IPublisher, "id">) => void;
}

export const AddPublisher = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const navigate = useNavigate();
  const { handleAddPublisher } = useOutletContext<handleAddPublisher>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data, 'Add Publi')
    handleAddPublisher({
      name: data.name,
      address: data.address,
      district: data.district,
      city: data.city,
      UF: data.uf,
    });

    navigate('/publishers')
  };
  return (
    <Modal>
      <AiOutlineClose
        className="close-modal-button"
        onClick={() => navigate("/publishers")}
      />
      <Container onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="publisher-name">Nome da Editora</label>
          <Input
            type="text"
            id="publisher-name"
            isError={errors.name}
            {...register("name", { required: "Preencha esse campo!" })}
          />
          {errors.name?.message && <small>{errors.name?.message}</small>}
        </div>
        <div className="input-container">
          <label htmlFor="publisher-address">Endereço da Editora</label>
          <Input
            type="text"
            id="publisher-address"
            isError={errors.address}
            {...register("address", { required: "Preencha esse campo!" })}
          />
          {errors.address?.message && <small>{errors.address?.message}</small>}
        </div>
        <div className="input-container">
          <label htmlFor="publisher-district">Bairro da Editora</label>
          <Input
            type="text"
            id="publisher-district"
            isError={errors.district}
            {...register("district", { required: "Preencha esse campo!" })}
          />
          {errors.district?.message && (
            <small>{errors.district?.message}</small>
          )}
        </div>
        <div className="input-container">
          <label htmlFor="publisher-city">Cidade da Editora</label>
          <Input
            type="text"
            id="publisher-city"
            isError={errors.city}
            {...register("city", { required: "Preencha esse campo!" })}
          />
          {errors.city?.message && <small>{errors.city?.message}</small>}
        </div>
        <div className="input-container">
          <label htmlFor="publisher-uf">UF da Editora</label>
          <Input
            type="text"
            id="publisher-uf"
            isError={errors.uf}
            {...register("uf", { required: "Preencha esse campo!" })}
          />
          {errors.uf?.message && <small>{errors.uf?.message}</small>}
        </div>
        <div className="input-container">
          <input type="submit" value="Cadastrar" />
        </div>
      </Container>
    </Modal>
  );
};
