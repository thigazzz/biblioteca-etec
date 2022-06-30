import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 32rem;

  margin: 0 auto;
  margin-top: 20px;

  overflow-y: scroll;

  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.colors.background};
    width: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 5px;
    scroll-behavior: smooth;
  }

  table {
    width: 100%;
    max-height: 100%;

    border-collapse: collapse;
    border-radius: 5px;

    td,
    th {
      padding: 15px;
    }

    thead {
      width: 100%;
      height: 3.75rem;

      color: #fff;

      background-color: ${({ theme }) => theme.colors.background};

      tr {
        width: 100%;
      }

      th {
        text-align: start;

      }
    }
    tbody {
      tr {
        height: 4.5rem;
        background-color: #fff;
        border-bottom: 1px solid rgba(0,0,0,0.1);

      }
    }
  }
`;
