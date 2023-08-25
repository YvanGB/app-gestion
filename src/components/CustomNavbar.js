import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function CustomNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className='px-4 justify-content-between sticky-top'>
      <Navbar.Brand className='mr-auto brand-style'>PLUTON</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggle" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link href="/home" className='nav-item'>Produits</Nav.Link>
          <Nav.Link href="/categories" className='nav-item'>Catégories</Nav.Link>
          <Nav.Link href="/apropos" className='nav-item'>À Propos</Nav.Link>
        </Nav>

        {/* <Form inline className="mr-4">
          <div className="input-group">
            <FormControl type="text" placeholder="Rechercher" className="bg-dark text-white shadow-none" style={{ outline: 'none', boxShadow: 'none', borderColor: 'white' }} />
            <Button variant="custom" className="custom-icon-button">
              <FaSearch className="custom-icon" />
            </Button>
          </div>
        </Form> */}


        <Button variant="custom" alignRight className="text-end d-lg-none custom-icon-button" onClick={handleLogout}>
          <FaSignOutAlt className="custom-icon" />
        </Button>

        <Button variant="custom" className="ml-auto ms-2 custom-icon-button d-none d-lg-block" onClick={handleLogout}>
          <FaSignOutAlt className="custom-icon" />
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
