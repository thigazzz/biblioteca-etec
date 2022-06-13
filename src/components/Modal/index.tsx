import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { Content, Overlay } from "./style";

interface ModalProps {
    children: ReactNode
}

export const Modal = ({children}: ModalProps) => {
  return ReactDOM.createPortal(
    <Overlay>
      <Content>
        {children}
      </Content>
    </Overlay>,
    document.body
  );
};
