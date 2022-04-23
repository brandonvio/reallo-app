import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Login } from "../components/Login";

export const LoginModal = props => {
  return (
    <Modal {...props} className="modal-full">
      <Modal.Header closeButton className="modal-full">
        <Modal.Title className="modal-full">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-full">
        <Login text={props.text} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
