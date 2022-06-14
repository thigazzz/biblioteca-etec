import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 84vh;

  display: flex;
  justify-content: center;
  align-items: center;

  .center {
    width: 80%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .info {
      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        height: 50px;
        width: 100px;

        background-color: ${({ theme }) => theme.colors.mainColor};
        color: #fff;

        font-weight: bold;

        border-radius: 4px;

        transition: filter 0.2s;

        box-shadow: rgba(0, 0, 0, 0.1);

        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }
`;
