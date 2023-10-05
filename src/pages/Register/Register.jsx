

/* src/index.css */
import 'bootstrap/dist/css/bootstrap.min.css';



import RegistrationForm from '../RegistrationForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Register() {
  

  return (
    <>
     <Container>
      <Row>
        <Col className='main-head'><h1>REGISTER YOUR TAXI<br/> HERE..!!</h1></Col>

      </Row>
    </Container>
   <RegistrationForm/>
      
      
    </>
  )
}

export default Register;
