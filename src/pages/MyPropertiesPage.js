import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PropertyManager } from "../components/PropertyManager";
import { propertyManager, closePropertyModalView } from "../reducers/actions";
import { PropertyModalView } from "../components/PropertyModalView";

export const MyPropertiesPage = () => {
  const user = useSelector(state => state.user);
  const showPropertyModal = useSelector(state => state.showPropertyModal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(propertyManager(user.user_id.toString()));
  }, [dispatch, user.user_id]);

  if (!user.loggedIn) {
    return (
      <>
        <div>You must be logged in to access this page...</div>
      </>
    );
  }

  return (
    <>
      <PropertyModalView
        title="View Property"
        show={showPropertyModal}
        onHide={() => dispatch(closePropertyModalView())}
      />
      <PropertyManager />
    </>
  );
};
