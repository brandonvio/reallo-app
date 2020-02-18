import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../reducers/actions";

export const Login = () => {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.user);
  const badUsernameOrPassword = useSelector(state => state.badUsernameOrPassword);
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    dispatch(loginUser({ username: username, password: password }));
    setValidated(false);
  };

  if (user.loggedIn)
    return (
      <Row>
        <Col xs={12} md={12} lg={12}>
          <Card>
            <Card.Header>Logged in as {user.username}...</Card.Header>
            <Card.Body>
              <Button variant="info" onClick={() => dispatch(logoutUser())}>
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );

  return (
    <Row>
      <Col xs={12} md={12} lg={12}>
        <Card>
          <Alert show={badUsernameOrPassword} variant="danger">
            Invalid username or password. Login failed.
          </Alert>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Control
                  required
                  size="sm"
                  type="text"
                  autoComplete="off"
                  placeholder="enter your username"
                  value={username}
                  onChange={e => {
                    setUsername(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="commentText">
                <Form.Control
                  required
                  size="sm"
                  type="password"
                  autoComplete="off"
                  placeholder="enter your password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your password.
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="info" type="submit">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
