import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { PropertyView } from "../components/PropertyView";

export const PropertyModalView = props => {
  const property = useSelector(state => state.propertySelected);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    if (!property) return;
    let modalTitle = "";
    if (property.property_id === 0) {
      modalTitle = "New Property";
    } else {
      modalTitle = `${property.street_1}, ${property.city}, ${property.state} ${property.zipcode}`;
    }
    setModalTitle(modalTitle);
  }, [property]);

  // console.log(props.property_id);
  if (!property) {
    return <div></div>;
  }

  return (
    <Modal {...props} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PropertyView />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
