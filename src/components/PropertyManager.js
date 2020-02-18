import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardColumns, Button } from "react-bootstrap";
import { viewProperty, deleteProperty } from "../reducers/actions";
import { ConfirmModal } from "../components/ConfirmModal";
import PropertyButtonNew from "../components/PropertyButtonNew";
import CurrencyFormat from "react-currency-format";

export const PropertyManager = () => {
  const [deletePropertyId, setDeletePropertyId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const properties = useSelector(state => state.propertiesManager);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const confirmDelete = propertyId => {
    setDeletePropertyId(propertyId);
    setShowDeleteModal(true);
  };

  const handleClose = result => {
    if (result) {
      dispatch(deleteProperty(deletePropertyId, user.user_id));
    }
    setShowDeleteModal(false);
  };

  const openPropertyModalView = propertyId => {
    dispatch(viewProperty(propertyId));
  };

  return (
    <>
      <ConfirmModal
        show={showDeleteModal}
        handleClose={handleClose}
        text="Are you sure you want to delete this Property?"
        title="Please confirm..."
      />
      <Card>
        <Card.Header>
          <PropertyButtonNew />
        </Card.Header>
        <Card.Body>
          <CardColumns>
            {properties.map(property => (
              <Card key={property.property_id}>
                <div
                  className="link"
                  onClick={() => {
                    openPropertyModalView(property.property_id);
                  }}
                >
                  <Card.Img variant="top" src={property.main_image_url} />
                </div>
                <Card.Body>
                  <Card.Title>
                    MLS# <b>{property.mls_num}</b>
                  </Card.Title>
                  <CurrencyFormat
                    value={property.sales_price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    renderText={value => <span>{value}</span>}
                  />
                  <br />
                  {`${property.street_1}`}
                  <br />
                  {`${property.city}, ${property.state} ${property.zipcode}`}
                  <br />
                  <b>{property.bedrooms}</b> bed <b>{property.bathrooms}</b> bath{" "}
                  <b>{property.square_feet}</b> sqft
                </Card.Body>
                <Card.Footer>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => {
                      openPropertyModalView(property.property_id);
                    }}
                  >
                    View Property
                  </Button>
                  &nbsp;
                  <Button
                    size="sm"
                    variant="outline-warning"
                    onClick={() => {
                      confirmDelete(property.property_id);
                    }}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </CardColumns>
        </Card.Body>
      </Card>
    </>
  );
};
