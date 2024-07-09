const initialState = {
  userToken: "",
  userStatus: "USER",
  userData: {
    userName: "",
    userRegistrationNo: "",
    userEmail: "",
    userPhoneNumber: 0,
    userDayScholarORhosteler: "",
  },
};

export const storedUserData = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_USER_DATA":
      return {
        ...state,
        userToken: action.payload.userToken,
        userStatus: action.payload.userStatus,
        userData: {
          ...state.userData,
          userName: action.payload.userData.userName,
          userRegistrationNo: action.payload.userData.userRegistrationNo,
          userEmail: action.payload.userData.userEmail,
          userPhoneNumber: action.payload.userData.userPhoneNumber,
          userDayScholarORhosteler:
            action.payload.userData.userDayScholarORhosteler,
        },
      };

    case "UPDATE_PHONE_NUMBER":
      return {
        ...state,
        userData: {
          ...state.userData,
          userPhoneNumber: action.payload.phoneNo,
        },
      };

    case "UPDATE_DAY_SCHOLAR_HOSTELER":
      return {
        ...state,
        userData: {
          ...state.userData,
          userDayScholarORhosteler: action.payload.dayScholarORhosteler,
        },
      };

    case "REMOVE_USER_DATA":
      return {
        ...state,
        userToken: "",
        userStatus: "USER",
        userData: {
          userName: "",
          userRegistrationNo: "",
          userEmail: "",
          userPhoneNumber: "",
        },
      };

    default:
      return state;
  }
};

export default storedUserData;
