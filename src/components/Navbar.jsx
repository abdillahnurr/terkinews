import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; 
import brandLogo from '../assets/brand.png'; 

function NavigationBar() {
  const [keywordSearch, setKeywordSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keywordSearch.trim()) {
      navigate(`/search/${keywordSearch}`);
      setKeywordSearch("");
    }
  };


  return (
    <Navbar bg="light" expand="lg" className="mb-4 fixed-top shadow">
      <Navbar.Brand as={Link} to="/">
        <img src={brandLogo} alt="Brand" height="20" className="d-inline-block align-top brand-app"/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto font-link">
          <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} as={Link} to="/indonesia">Indonesia</NavLink>
          <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} as={Link} to="/saved">Saved</NavLink>
          <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} as={Link} to="/programming">Programming</NavLink>
        </Nav>
        <Form onSubmit={handleSearchSubmit} className="ml-auto search-bar">
          
          <FormControl
            type="text"
            placeholder="Search news..."
            className="ml-2"
            value={keywordSearch}
            onChange={(e) => setKeywordSearch(e.target.value)}
          />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
