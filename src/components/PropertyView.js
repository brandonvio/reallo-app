import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { PropertyCardBig } from "../components/PropertyCardBig";
import { PropertyForm } from "../components/PropertyForm";
import { PropertyImages } from "../components/PropertyImages";
import { useDispatch } from "react-redux";
import { getPropertyImages } from "../reducers/actions";
import { useSelector } from "react-redux";

export const PropertyView = () => {
  const [key, setKey] = useState("view");
  const user = useSelector(state => state.user);
  const property = useSelector(state => state.propertySelected);
  const userProperty = property.user_id === user.user_id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (property.property_id === 0) {
      setKey("form");
    } else {
      dispatch(getPropertyImages(property.property_id));
    }
  }, [property, dispatch]);

  // console.log(user, property);
  if (userProperty || (user.loggedIn && property.property_id === 0))
    return (
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
        <Tab eventKey="form" title="Edit">
          <PropertyForm />
        </Tab>
        <Tab eventKey="images" title="Images" disabled={property.property_id === 0}>
          <PropertyImages property_id={property.property_id} />
        </Tab>
        <Tab eventKey="view" title="View" disabled={property.property_id === 0}>
          <PropertyCardBig />
        </Tab>
      </Tabs>
    );

  if (!userProperty)
    return <PropertyCardBig userProperty={userProperty} property={property} user={user} />;
};
