const initialState = {
  userToken: "",
  userStatus: "USER",
  userData: {
    userName: "",
    userRegistrationNo: "",
    userEmail: "",
    userPhoneNumber: 0,
    userDayScholarORhosteler: "",
    notifications: false,
  },
  notificationPopupCount: 0,
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
          notifications: action.payload.userData.notifications,
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

    case "UPDATE_NOTIFICATION_STATUS":
      return {
        ...state,
        userData: {
          ...state.userData,
          notifications: action.payload.notifications,
        },
      };

    case "INCREASE_NOTIFICATION_POPUP_COUNT":
      return {
        ...state,
        notificationPopupCount: state.notificationPopupCount + 1,
      };

    case "REMOVE_USER_DATA":
      return {
        ...state,
        userToken: null,
        userStatus: "USER",
        userData: {
          userName: "",
          userRegistrationNo: "",
          userEmail: "",
          userPhoneNumber: "",
          notifications: false,
        },
        notificationPopupCount: 0,
      };

    default:
      return state;
  }
};

export default storedUserData;
