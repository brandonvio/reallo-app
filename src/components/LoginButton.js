import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { LoginModal } from "../components/LoginModal";
import { useSelector } from "react-redux";

export default function LoginButton(props) {
  const [modalShow, setModalShow] = useState(false);
  const user = useSelector(state => state.user);
  // console.log(props);
  const text = user.loggedIn ? user.username : "Login";
  return (
    <>
      <Button
        className="btn btn-default navbar-btn"
        onClick={e => {
          e.preventDefault();
          setModalShow(true);
        }}
      >
        {text}
      </Button>
      <LoginModal property_id={0} show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
