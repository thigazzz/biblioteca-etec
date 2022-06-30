import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

import { Theme } from "../styles/Theme";
import { Container } from "./styles";
import { MainRoutes } from "../routes/Routes";

function App() {
  return (
    <Router>
      <Theme>
        <Container>
          <header>
            <div className="center">
              <h1>Etec</h1>
            </div>
          </header>
          <MainRoutes/>
        </Container>
      </Theme>
    </Router>
  );
}

export default App;
