import styled from "styled-components";

interface InputProps {
  isError: boolean;
}

export const Container = styled.form`
  width: 100%;
  .input-container {
    width: 100%;
    display: flex;
    flex-direction: column;

    & + .input-container {
      margin-top: 20px;
    }

    input[type="submit"] {
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      background-color: ${({ theme }) => theme.colors.mainColor};
      color: #fff;

      font-weight: bold;

      cursor: pointer;
    }

    small {
        color: #F97C7C;
    }
  }
`;

export const Input = styled.input<InputProps>`
  height: 2.75rem;
  margin-top: 10px;


  padding: 20px;

  border-bottom: 1px solid #ccc;
  border-radius: 4px;

  color: ${props => !props.isError ? '#000' : '#fff'};

`;
