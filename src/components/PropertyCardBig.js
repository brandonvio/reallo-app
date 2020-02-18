import React from "react";
import { Table, Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";

export const PropertyCardBig = () => {
  const property = useSelector(state => state.propertySelected);
  const propertyImages = useSelector(state => state.propertySelectedImages);

  return (
    <div>
      <div>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={property.main_image_url} alt="First slide" />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          {propertyImages.map((item, key) => (
            <Carousel.Item key={key}>
              <img className="d-block w-100" src={item.url} alt="First slide" />
              <Carousel.Caption>{item.caption}</Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div>
        <CurrencyFormat
          value={property.sales_price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={value => <span className="header2">{value}</span>}
        />
        <div>
          <b>{property.bedrooms}</b> bed <b>{property.bathrooms}</b> bath{" "}
          <b>{property.square_feet}</b> sqft
        </div>
        <div>{`${property.street_1}, ${property.city}, ${property.state} ${property.zipcode}`}</div>
        <br />
        <div>{property.description}</div>
        <br />
        <Table striped bordered hover size="sm">
          <tbody>
            <tr>
              <th>MLS</th>
              <td>{property.mls_num}</td>
            </tr>
            <tr>
              <th>Neighborhood</th>
              <td>{property.neighborhood}</td>
            </tr>
            <tr>
              <th>Date Listed</th>
              <td>{property.date_listed}</td>
            </tr>
            <tr>
              <th>Garage Size</th>
              <td>{property.garage_size}</td>
            </tr>
            <tr>
              <th>Lot Size</th>
              <td>{property.lot_size}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};
