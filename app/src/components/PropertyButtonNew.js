import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { newProperty } from "../reducers/actions";

export default function PropertyButtonNew() {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        variant="info"
        onClick={() => {
          dispatch(newProperty());
        }}
      >
        New Property
      </Button>
    </>
  );
}
