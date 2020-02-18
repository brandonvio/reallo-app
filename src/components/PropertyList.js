import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import PropertyCard from "./PropertyCard";
import { viewProperty } from "../reducers/actions";

export default () => {
  const properties = useSelector(state => state.properties);
  const dispatch = useDispatch();

  const openPropertyModalView = property_id => {
    // console.log(property_id);
    dispatch(viewProperty(property_id));
  };

  return (
    <>
      <Row>
        <Col>
          <div className="card-columns">
            {properties.map((item, key) => (
              <PropertyCard
                property={item}
                key={key}
                openPropertyModalView={openPropertyModalView}
              />
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};
