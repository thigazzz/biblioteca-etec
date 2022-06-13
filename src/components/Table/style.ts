import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 32rem;

  margin: 0 auto;
  margin-top: 20px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    background-color: #777;
    width: 5px;
    border-bottom-right-radius: 5px;
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
      padding: 10px;
    }

    thead {
      height: 3.75rem;

      color: #fff;

      background-color: ${({ theme }) => theme.colors.background};

      th {
        text-align: start;
      }
    }
    tbody {
      tr {
        height: 4.5rem;

        &:nth-child(odd) {
          background-color: #fff;
        }
        &:nth-child(even) {
          background-color: #ddd;
        }

        button {
            
        }
      }
    }
  }
`;
