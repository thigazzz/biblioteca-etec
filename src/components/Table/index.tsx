import { ReactNode } from "react";
import { Container } from "./style";

interface TableProps {
  children: ReactNode;
}

export const Table = ({ children }: TableProps) => {
  return (
    <Container>
      <table>{children}</table>
    </Container>
  );
};
