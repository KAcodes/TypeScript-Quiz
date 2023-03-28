import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { Col, Container, Row } from 'react-bootstrap';
import Quiz from './components/quiz';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Quiz/>
    </div>
  )
}

export default App
