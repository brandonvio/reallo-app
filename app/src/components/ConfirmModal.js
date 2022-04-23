import React from "react";
import { Modal, Button } from "react-bootstrap";

export const ConfirmModal = ({ text, title, show, handleClose }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClose(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-info" onClick={() => handleClose(false)}>
            Close
          </Button>
          <Button variant="warning" onClick={() => handleClose(true)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
