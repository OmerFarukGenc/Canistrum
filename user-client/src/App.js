import LoginScreen from "./LoginScreen";
import LoggedScreen from "./LoggedScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  return (
    <Container >
      <Row>
        <Col className="col-4">
          <Router>
            <Routes>
              <Route path="/login" element={<LoginScreen />} />

              <Route path="profile" element={<LoggedScreen />} />
            </Routes>
          </Router>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
