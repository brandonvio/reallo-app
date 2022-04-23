import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

export default ({ property, openPropertyModalView }) => {
  return (
    <Link
      to="#"
      onClick={() => {
        openPropertyModalView(property.property_id);
      }}
    >
      <div className="property-card">
        <Card>
          <Card.Img variant="top" src={property.main_image_url} />
          <Card.ImgOverlay>
            <Card.Text>
              <CurrencyFormat
                value={property.sales_price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                renderText={value => <span className="header2">{value}</span>}
              />
            </Card.Text>
          </Card.ImgOverlay>
          <Card.Body>
            <h4>
              {property.bedrooms} bed {property.bathrooms} bath {property.square_feet} sqft
            </h4>
            {`${property.street_1}`}
            <br />
            {`${property.city}, ${property.state} ${property.zipcode}`}
            <br />
          </Card.Body>
        </Card>
      </div>
    </Link>
  );
};
