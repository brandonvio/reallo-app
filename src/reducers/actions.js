import { ApiService } from "../services/ApiService";
import {
  replaceEmptyStringsWithNull,
  replaceNullWithEmptyString
} from "../services/UtilityService";

const api = new ApiService();

/* User actions... */
export const loginUser = credentials => {
  return async dispatch => {
    const { validateUser } = await api.validateUser(credentials);
    const action = {
      type: "USER_LOGIN",
      payload: validateUser
    };
    dispatch(action);
  };
};

export const logoutUser = () => ({
  type: "USER_LOGOUT",
  payload: {}
});

export const closePropertyModalView = () => ({
  type: "CLOSE_PROPERTY_MODAL_VIEW",
  payload: {}
});

export const propertyManager = user_id => async dispatch => {
  const input = { user_id: user_id.toString() };
  const { searchProperty } = await api.searchProperty(input);
  const action = { type: "PROPERTIES_MANAGER", payload: searchProperty };
  dispatch(action);
};

/* Property actions... */
export const viewProperty = property_id => {
  return async dispatch => {
    const { findProperty } = await api.findProperty(parseInt(property_id));
    replaceNullWithEmptyString(findProperty);
    const action = {
      type: "PROPERTY_VIEW",
      payload: findProperty
    };
    dispatch(action);
  };
};

export const allProperties = () => async dispatch => {
  const { properties } = await api.getAllProperties();
  const action = { type: "PROPERTIES_ALL", payload: properties };
  dispatch(action);
};

export const searchProperty = input => async dispatch => {
  const { searchProperty } = await api.searchProperty(input);
  const action = { type: "PROPERTIES_ALL", payload: searchProperty };
  dispatch(action);
};

export const editProperty = property_id => {
  return async dispatch => {
    const { findProperty } = await api.findProperty(parseInt(property_id));
    replaceNullWithEmptyString(findProperty);
    const action = {
      type: "PROPERTY_EDIT",
      payload: findProperty
    };
    dispatch(action);
  };
};

export const deleteProperty = (property_id, user_id) => {
  return async dispatch => {
    await api.deleteProperty(parseInt(property_id));
    const action = {
      type: "PROPERTY_DELETE"
    };
    dispatch(action);
    dispatch(propertyManager(user_id));
  };
};

export const newProperty = () => {
  let property = {};
  if (false) {
    property = {
      property_id: 0,
      main_image_url: "https://re-demo-images.s3-us-west-2.amazonaws.com/comingSoong.png",
      mls_num: "MLS01234",
      sales_price: "900000",
      description: "This is a great home!",
      street_1: "1234 Bond St.",
      street_2: "",
      city: "Bend",
      state: "OR",
      zipcode: "97702",
      bedrooms: "2",
      bathrooms: "2.5",
      neighborhood: "Downtown",
      square_feet: "",
      garage_size: "",
      lot_size: "",
      date_listed: "2019-11-28"
    };
  } else {
    property = {
      property_id: 0,
      main_image_url: "https://re-demo-images.s3-us-west-2.amazonaws.com/comingSoong.png",
      mls_num: "",
      sales_price: "",
      description: "",
      street_1: "",
      street_2: "",
      city: "",
      state: "",
      zipcode: "",
      bedrooms: "",
      bathrooms: "",
      neighborhood: "",
      square_feet: "",
      garage_size: "",
      lot_size: "",
      date_listed: "2019-12-01"
    };
  }

  const action = {
    type: "PROPERTY_NEW",
    payload: property
  };
  return action;
};

export const saveProperty = (user_id, data) => {
  replaceEmptyStringsWithNull(data);
  return async dispatch => {
    try {
      const doesMlsNumExist = await api.mlsNumExists(data.mls_num, data.property_id);
      if (doesMlsNumExist) {
        throw new Error(
          `MLS Number ${data.mls_num} is being used for another property. MLS Numbers must be unique for every property. Please enter a different MLS Number.`
        );
      } else {
        const { saveProperty } = await api.saveProperty(data);
        replaceNullWithEmptyString(saveProperty);
        const action = {
          type: "PROPERTY_SAVE",
          payload: saveProperty
        };
        dispatch(action);
        dispatch(propertyManager(user_id));
      }
    } catch (err) {
      // console.log(err);
      const action = {
        type: "PROPERTY_SAVE_FAIL",
        payload: err.message
      };
      dispatch(action);
    }
  };
};

/* Property Image Actions */
export const getPropertyImages = property_id => {
  return async dispatch => {
    const data = await api.getPropertyImages(property_id);
    for (let image of data.images) {
      if (image.caption === null) image.caption = "";
    }
    const action = {
      type: "PROPERTY_IMAGES",
      payload: data.images
    };
    dispatch(action);
  };
};

export const savePropertyImages = (property_id, newImages, oldImages) => {
  return async dispatch => {
    for (let i = 0; i < oldImages.length; i++) {
      // console.log(oldImages[i].caption, newImages[i].caption);
      if (oldImages[i].caption !== newImages[i].caption) {
        await api.saveImage(newImages[i]);
      }
    }
    dispatch(getPropertyImages(property_id));
  };
};

export const deletePropertyImage = (property_id, image_id) => {
  return async dispatch => {
    await api.deleteImage(image_id);
    dispatch(getPropertyImages(property_id));
  };
};

export const setMainImageUrl = (property_id, main_image_url) => {
  return async dispatch => {
    await api.setMainImageUrl(property_id, main_image_url);
    dispatch(viewProperty(property_id));
  };
};
