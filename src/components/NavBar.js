import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginButton from "../components/LoginButton";

const NavBar = () => {
  const user = useSelector(state => state.user);

  // console.log(user);
  return (
    <Navbar expand="lg" className={("navbar-dark", "bg-primary")}>
      <Navbar.Brand>
        <Link className="link" to="/">
          FTS Real Estate
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {user.loggedIn && (
            <Link to="/myproperties" className="link">
              My Properties
            </Link>
          )}
        </Nav>
        <Navbar.Text>
          <LoginButton />
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
