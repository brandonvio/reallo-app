import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropertyList from "../components/PropertyList";
import { PropertyModalView } from "../components/PropertyModalView";
import { closePropertyModalView } from "../reducers/actions";
import { Search } from "../components/Search";

export const HomePage = () => {
  const showPropertyModal = useSelector(state => state.showPropertyModal);
  const showNoSearchResults = useSelector(state => state.showNoSearchResults);

  const dispatch = useDispatch();

  return (
    <>
      <Search />
      <PropertyList />
      <PropertyModalView
        title="View Property"
        show={showPropertyModal}
        onHide={() => dispatch(closePropertyModalView())}
      />
      {showNoSearchResults && <div>No properties matched your search criteria.</div>}
    </>
  );
};
