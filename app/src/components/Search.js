import React from "react";
import { useDispatch } from "react-redux";
import { Form, Col, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import { searchProperty } from "../reducers/actions";
import * as yup from "yup";

export const Search = () => {
  const dispatch = useDispatch();

  const property = {
    mls_num: "",
    city: "",
    state: "",
    zipcode: "97702",
    bedrooms: "3",
    bathrooms: "",
    square_feet: "1700"
  };

  const submitForm = data => {
    // console.log(data);
    dispatch(searchProperty(data));
  };

  const schema = yup.object({
    mls_num: yup.string(),
    sales_price: yup.number().positive(),
    state: yup.string(),
    city: yup.string(),
    bedrooms: yup
      .number()
      .integer()
      .positive(),
    bathrooms: yup.number().positive(),
    square_feet: yup
      .number()
      .integer()
      .positive(),
    garage_size: yup
      .number()
      .integer()
      .positive(),
    lot_size: yup.number().positive(),
    zipcode: yup.string().matches(/^[0-9]{5}$/, "Must be exactly 5 digits")
  });

  return (
    <div>
      <Card>
        <Card.Header>Property Search</Card.Header>
        <Card.Body>
          <Formik
            onSubmit={submitForm}
            enableReinitialize={true}
            validationSchema={schema}
            initialValues={{
              ...property
            }}
          >
            {({ touched, errors, handleSubmit, handleChange, handleBlur, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} controlId="mls_num">
                    <Form.Label>MLS</Form.Label>
                    <Form.Control
                      maxLength="30"
                      placeholder="MLS"
                      name="mls_num"
                      value={values.mls_num}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="bedrooms">
                    <Form.Label>Beds</Form.Label>
                    <Form.Control
                      maxLength="2"
                      placeholder="bedrooms"
                      name="bedrooms"
                      value={values.bedrooms}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="bathrooms">
                    <Form.Label>Baths</Form.Label>
                    <Form.Control
                      maxLength="2"
                      placeholder="Bathrooms"
                      name="bathrooms"
                      value={values.bathrooms}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="square_feet">
                    <Form.Label>Sq Ft</Form.Label>
                    <Form.Control
                      maxLength="6"
                      placeholder="Square Feet"
                      name="square_feet"
                      value={values.square_feet}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="city">
                    <Form.Control
                      maxLength="100"
                      placeholder="City"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="state">
                    <Form.Control
                      as="select"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">State...</option>
                      <option value="OR">Oregon</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="zipcode">
                    <Form.Control
                      maxLength="5"
                      placeholder="Zip"
                      name="zipcode"
                      value={values.zipcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Form.Row>

                <Button variant="info" type="submit">
                  Search
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>

      <br />
    </div>
  );
};
