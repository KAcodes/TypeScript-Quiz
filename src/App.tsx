import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from 'react-bootstrap';
import Quiz from './components/quiz';


function App() {


  return (
    <Container>
      <Row>
        <Col>
          <Quiz/>
        </Col>
      </Row>
    </Container>

  )
}

export default App
