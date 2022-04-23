import React from "react";
import { Navbar, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginButton from "../components/LoginButton";

const NavBar = () => {
  const user = useSelector((state) => state.user);

  // console.log(user);
  return (
    <Navbar expand="lg">
      <Navbar.Brand>
        <a href="/">reallo.xyz</a>
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
        <Form inline>
          {/* <Button type="submit">Submit</Button> */}
          <LoginButton />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
