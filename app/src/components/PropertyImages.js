import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Table, Form } from "react-bootstrap";
import { PropertyImageUpload } from "../components/PropertyImageUpload";
import { savePropertyImages, deletePropertyImage, setMainImageUrl } from "../reducers/actions";
import { ConfirmModal } from "../components/ConfirmModal";

export const PropertyImages = ({ property_id }) => {
  const _serverImages = useSelector(state => state.propertySelectedImages);
  const [_localImages, _setLocalImages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteImageId, setDeleteImageId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const _images = JSON.parse(JSON.stringify(_serverImages));
    _setLocalImages(_images);
  }, [_serverImages]);

  const confirmDelete = image_id => {
    setDeleteImageId(image_id);
    setShowDeleteModal(true);
  };

  const handleClose = result => {
    if (result) {
      dispatch(deletePropertyImage(property_id, deleteImageId));
    }
    setShowDeleteModal(false);
  };

  return (
    <>
      <ConfirmModal
        show={showDeleteModal}
        handleClose={handleClose}
        text="Are you sure you want to delete this Image?"
        title="Please confirm..."
      />
      <Card>
        <Card.Header>
          <Button
            variant="info"
            onClick={() => {
              dispatch(savePropertyImages(property_id, _localImages, _serverImages));
            }}
          >
            Save Captions
          </Button>
        </Card.Header>
        <Card.Body>
          <Form>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Caption</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {_localImages.map(image => (
                  <tr key={image.image_id}>
                    <td style={{ padding: "0px", width: "120", textAlign: "center" }}>
                      <img
                        style={{ margin: "0px" }}
                        width={120}
                        height={90}
                        className="mr-3"
                        src={image.url}
                        alt={image.caption}
                      />
                    </td>
                    <td
                      style={{
                        margin: "auto",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
                        padding: "10px",
                        width: "100%"
                      }}
                    >
                      {/* <Form.Control as="textarea" rows="3" value={image.caption} /> */}
                      <Form.Control
                        value={image.caption}
                        onChange={e => {
                          const _images = [].concat(_localImages);
                          const _image = _images.find(p => p.image_id === image.image_id);
                          _image.caption = e.target.value;
                          _setLocalImages(_images);
                        }}
                        type="text"
                        placeholder="Image caption..."
                      />
                    </td>
                    <td
                      style={{
                        margin: "auto",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
                        padding: "10px"
                      }}
                    >
                      <Button
                        style={{ whiteSpace: "nowrap" }}
                        variant="info"
                        size="sm"
                        onClick={() => {
                          dispatch(setMainImageUrl(property_id, image.url));
                        }}
                      >
                        Make Main Image
                      </Button>
                      &nbsp;
                      <Button
                        size="sm"
                        variant="outline-warning"
                        onClick={() => {
                          confirmDelete(image.image_id);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form>
        </Card.Body>
        <Card.Footer>
          <div>
            <div></div>
            <PropertyImageUpload property_id={property_id}>
              Upload an new Property image....
            </PropertyImageUpload>
          </div>
        </Card.Footer>
      </Card>
    </>
  );
};
