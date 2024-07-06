const initialState = {
  userEmail: "",
  emailVerified: false,
  otpVerified: false,
};

export const resetPasswordState = (state = initialState, action) => {
  switch (action.type) {
    case "EMAIL_VERIFICATION_DONE":
      return {
        ...state,
        emailVerified: true,
        userEmail: action.payload.userEmail,
      };

    case "OTP_VERIFICATION_DONE":
      return {
        ...state,
        otpVerified: true,
      };

    default:
      return state;
  }
};

export default resetPasswordState;
