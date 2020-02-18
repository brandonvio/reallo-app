import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Col, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import { saveProperty } from "../reducers/actions";
import * as yup from "yup";

export const PropertyForm = () => {
  const user = useSelector(state => state.user);
  const property = useSelector(state => state.propertySelected);
  const propertySaveStatus = useSelector(state => state.propertySaveStatus);
  const errorMessage = useSelector(state => state.errorMessage);
  const [showAlertsToggle, setShowAlertsToggle] = useState(false);
  const dispatch = useDispatch();

  if (!user.loggedIn) {
    return (
      <>
        <div>You must be logged in to access this page...</div>
      </>
    );
  }

  if (!property) {
    return <>Loading...</>;
  }

  const submitForm = data => {
    data.user_id = user.user_id;
    dispatch(saveProperty(user.user_id, { ...data }));
    setShowAlertsToggle(true);
    setTimeout(() => {
      setShowAlertsToggle(false);
    }, 1000 * 10);
  };

  const schema = yup.object({
    mls_num: yup.string().required(),
    sales_price: yup
      .number()
      .positive()
      .required(),
    date_listed: yup.date().required(),
    description: yup.string().required(),
    street_1: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    bedrooms: yup
      .number()
      .integer()
      .positive()
      .required(),
    bathrooms: yup
      .number()
      .positive()
      .required(),
    square_feet: yup
      .number()
      .integer()
      .positive()
      .required(),
    garage_size: yup
      .number()
      .integer()
      .positive(),
    lot_size: yup.number().positive(),
    zipcode: yup.string()
  });

  // console.log("propertyform.property.77", property);
  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={submitForm}
        enableReinitialize={true}
        initialValues={{
          ...property
        }}
      >
        {({ touched, errors, handleSubmit, handleChange, handleBlur, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Card>
              <Card.Header>
                <Button variant="info" type="submit">
                  Save Property
                </Button>
              </Card.Header>
              <Alert show={propertySaveStatus === -1 && showAlertsToggle} variant="danger">
                {errorMessage}
              </Alert>
              <Alert show={propertySaveStatus === 1 && showAlertsToggle} variant="success">
                Property saved.
              </Alert>

              <Card.Body>
                <Form.Row>
                  <Form.Group as={Col} controlId="val_mls_num">
                    <Form.Label>MLS</Form.Label>
                    <Form.Control
                      name="mls_num"
                      value={values.mls_num}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="MLS"
                      maxLength="32"
                      isValid={touched.mls_num && !errors.mls_num}
                      isInvalid={!!errors.mls_num && touched.mls_num}
                    />
                    <Form.Control.Feedback type="invalid">
                      MLS Number is required and must be unique across all properties.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="val_sales_price">
                    <Form.Label>Sales Price</Form.Label>
                    <Form.Control
                      name="sales_price"
                      isValid={touched.sales_price && !errors.sales_price}
                      isInvalid={!!errors.sales_price && touched.sales_price}
                      value={values.sales_price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Sales Price"
                      maxLength="12"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the Sales Price.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="val_date_listed">
                    <Form.Label>Listing Date</Form.Label>
                    <Form.Control
                      name="date_listed"
                      isValid={touched.date_listed && !errors.date_listed}
                      isInvalid={!!errors.date_listed && touched.date_listed}
                      value={values.date_listed}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="Date to list the property"
                      maxLength="32"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the Listing Date.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="val_description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    isValid={touched.description && !errors.description}
                    isInvalid={!!errors.description && touched.description}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    as="textarea"
                    rows="2"
                    maxLength="1000"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a Description of the property.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="val_street_1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      name="street_1"
                      isValid={touched.street_1 && !errors.street_1}
                      isInvalid={!!errors.street_1 && touched.street_1}
                      value={values.street_1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="1234 Main St"
                      maxLength="256"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="street_2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                      name="street_2"
                      value={values.street_2}
                      isValid={touched.street_2 && !errors.street_2}
                      isInvalid={!!errors.street_2 && touched.street_2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Apartment, studio, or floor"
                      maxLength="256"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="val_city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      name="city"
                      isValid={touched.city && !errors.city}
                      isInvalid={!!errors.city && touched.city}
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      maxLength="256"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a City ie Bend.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="val_state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      name="state"
                      isValid={touched.state && !errors.state}
                      isInvalid={!!errors.state && touched.state}
                      value={values.state}
                      onChange={handleChange}
                      required
                      as="select"
                    >
                      <option value="">Choose...</option>
                      <option value="OR">Oregon</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please select a State ie Oregon.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="val_zipcode">
                    <Form.Label required maxLength="5">
                      Zip
                    </Form.Label>
                    <Form.Control
                      name="zipcode"
                      isValid={touched.zipcode && !errors.zipcode}
                      isInvalid={!!errors.zipcode && touched.zipcode}
                      value={values.zipcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      minLength="5"
                      maxLength="5"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the property Zip ie 97702.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="val_bedrooms">
                    <Form.Label>Beds</Form.Label>
                    <Form.Control
                      name="bedrooms"
                      isValid={touched.bedrooms && !errors.bedrooms}
                      isInvalid={!!errors.bedrooms && touched.bedrooms}
                      value={values.bedrooms}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      maxLength="2"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the number of Bedrooms ie 4.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="val_bathrooms">
                    <Form.Label>Bathrooms</Form.Label>
                    <Form.Control
                      name="bathrooms"
                      isValid={touched.bathrooms && !errors.bathrooms}
                      isInvalid={!!errors.bathrooms && touched.bathrooms}
                      value={values.bathrooms}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      maxLength="5"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the number of Bathrooms ie 2.5.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="val_neighborhood">
                    <Form.Label>Neighborhood</Form.Label>
                    <Form.Control
                      name="neighborhood"
                      isValid={touched.neighborhood && !errors.neighborhood}
                      isInvalid={!!errors.neighborhood && touched.neighborhood}
                      value={values.neighborhood}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength="256"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="val_square_feet">
                    <Form.Label>Home Size (sqft)</Form.Label>
                    <Form.Control
                      name="square_feet"
                      isValid={touched.square_feet && !errors.square_feet}
                      isInvalid={!!errors.square_feet && touched.square_feet}
                      value={values.square_feet}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      maxLength="6"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the Home Size in square feet ie 2500.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="val_arage_size">
                    <Form.Label>Garage Size (sqft)</Form.Label>
                    <Form.Control
                      name="garage_size"
                      isValid={touched.garage_size && !errors.garage_size}
                      isInvalid={!!errors.garage_size && touched.garage_size}
                      value={values.garage_size}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength="6"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the Garage Size in square feet ie 925.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="val_lot_size">
                    <Form.Label>Lot Size (acre)</Form.Label>
                    <Form.Control
                      name="lot_size"
                      isValid={touched.lot_size && !errors.lot_size}
                      isInvalid={!!errors.lot_size && touched.lot_size}
                      value={values.lot_size}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength="6"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the Lot Size in acre ie 1.2.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};
