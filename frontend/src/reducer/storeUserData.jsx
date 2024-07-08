const initialState = {
  userToken: "",
  userStatus: "USER",
  userName: "",
  userRegistrationNo: "",
  userEmail: "",
};

export const storedUserData = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_USER_DATA":
      return {
        ...state,
        userToken: action.payload.userToken,
        userStatus: action.payload.userStatus,
        userName: action.payload.userName,
        userRegistrationNo: action.payload.userRegistrationNo,
        userEmail: action.payload.userEmail,
      };

    case "REMOVE_USER_DATA":
      return {
        ...state,
        userToken: "",
        userStatus: "USER",
        userName: "",
      };

    default:
      return state;
  }
};

export default storedUserData;
