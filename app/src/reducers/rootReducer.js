const testingMode = false;

const defaultUser = {
  user_id: 0,
  username: "guest",
  loggedIn: false
};

const testingUser = {
  user_id: 1,
  username: "hankw",
  loggedIn: true
};

const initialState = {
  user: testingMode ? testingUser : defaultUser,
  presignedUrl: null,
  properties: [],
  propertiesManager: [],
  propertySelected: null,
  propertySelectedImages: [],
  showPropertyModal: false,
  showNoSearchResults: false,
  badUsernameOrPassword: false,
  propertySaveStatus: 0,
  propertyDeleteStatus: 0,
  errorMessage: "EX"
};

function rootReducer(state = initialState, { type, payload }) {
  // console.log(type, payload);
  switch (type) {
    case "USER_LOGIN":
      let badUsernameOrPassword = false;
      let loginUser = {};
      if (payload != null) {
        loginUser = { ...payload };
        loginUser.loggedIn = true;
      } else {
        loginUser = { ...state.user };
        badUsernameOrPassword = true;
      }
      return {
        ...state,
        user: loginUser,
        badUsernameOrPassword: badUsernameOrPassword
      };
    case "USER_LOGOUT":
      return { ...state, user: { ...defaultUser }, loggedIn: false };
    case "PROPERTIES_ALL":
      return { ...state, properties: payload, showNoSearchResults: payload.length === 0 };
    case "PROPERTIES_MANAGER":
      return { ...state, propertiesManager: payload };
    case "PROPERTY_VIEW":
      return {
        ...state,
        propertySelected: { ...payload },
        propertySaveStatus: 0,
        propertyDeleteStatus: 0,
        showPropertyModal: true
      };
    case "PROPERTY_NEW":
      return {
        ...state,
        propertySelected: { ...payload },
        propertySaveStatus: 0,
        propertyDeleteStatus: 0,
        showPropertyModal: true
      };
    case "PROPERTY_SAVE":
      return {
        ...state,
        propertySaveStatus: 1,
        propertySelected: { ...payload }
      };
    case "PROPERTY_DELETE":
      return {
        ...state,
        propertyDeleteStatus: 1,
        propertySelected: null
      };
    case "CLOSE_PROPERTY_MODAL_VIEW":
      return {
        ...state,
        showPropertyModal: false
      };
    case "PROPERTY_SAVE_FAIL":
      // console.log("rootreducer.propertysavefail.errormessage", payload);
      return { ...state, propertySaveStatus: -1, errorMessage: payload };

    case "PROPERTY_IMAGES":
      return { ...state, propertySelectedImages: payload };

    default:
      return { ...state };
  }
}

export default rootReducer;
