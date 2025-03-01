import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Navbar1 = () => {
  return (
    <div>
       <Navbar expand="lg" className="bg-danger">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        
        <div className='d-flex mx-auto text-white'>
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav className="me-auto text-white">
            <Nav.Link href="#home" className='text-white fs-5 me-2'>Home</Nav.Link>
            <Nav.Link href="#link" className='text-white fs-5 me-2'>About Us</Nav.Link>
            <Nav.Link href="#home" className='text-white fs-5 me-2'>Our Product</Nav.Link>
            <Nav.Link href="#link" className='text-white fs-5 me-2'>Contact US</Nav.Link>          
          </Nav>
        </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
    </div>
  )
}

export default Navbar1
