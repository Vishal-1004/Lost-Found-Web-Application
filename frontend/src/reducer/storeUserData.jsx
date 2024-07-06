const initialState = {
  userToken: "",
  userStatus: "USER",
  userName: "",
};

export const storedUserData = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_USER_DATA":
      return {
        ...state,
        userToken: action.payload.userToken,
        userStatus: action.payload.userStatus,
        userName: action.payload.userName,
      };

    case "REMOVE_USER_DATA":
      return initialState;

    default:
      return state;
  }
};

export default storedUserData;
