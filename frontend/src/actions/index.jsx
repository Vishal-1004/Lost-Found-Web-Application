export const storeUserData = (
  userToken,
  userStatus,
  userName,
  userRegistrationNo,
  userEmail
) => ({
  type: "STORE_USER_DATA",
  payload: { userToken, userStatus, userName, userRegistrationNo, userEmail },
});

export const removeUserData = () => ({
  type: "REMOVE_USER_DATA",
});

export const emailVerificationDone = (userEmail) => ({
  type: "EMAIL_VERIFICATION_DONE",
  payload: { userEmail },
});

export const otpVerificationDone = () => ({
  type: "OTP_VERIFICATION_DONE",
});

export const resettingPasswordDone = () => ({
  type: "RESET_PASSWORD_DONE",
});
