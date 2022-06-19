import { useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Theme } from "../styles/Theme";
import { Container } from "./styles";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Loans } from "./Loans";
import { MainRoutes } from "../routes/Routes";

function App() {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <Router>
      
      <Theme>
        <Container>
          <header>
            <div className="center">
              <h1>Etec</h1>
              <GiHamburgerMenu
                onClick={() => setIsActive(true)}
                className="toggle-button"
              />

              <nav className={`menu ${isActive ? "active" : ""}`}>
                <AiOutlineClose
                  onClick={() => setIsActive(false)}
                  className="close-menu"
                />
                <div className="content">
                  <a href="/loans">Empréstimos</a>
                  <a href="/books">Livros</a>
                  <a href="#">Teste</a>
                  <a href="#">Teste</a>
                </div>
              </nav>
            </div>
          </header>
          <MainRoutes/>
        </Container>
      </Theme>
    </Router>
  );
}

export default App;
