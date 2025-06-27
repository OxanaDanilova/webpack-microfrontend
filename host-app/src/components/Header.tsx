import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export function Header (){
  return (
    <Navbar data-bs-theme="dark" style={{backgroundColor: '#145c66'}} sticky={"top"}>
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="about">About me</Nav.Link>
          <Nav.Link href="contact">Contact</Nav.Link>
          <Nav.Link href="remote">Remote application</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
