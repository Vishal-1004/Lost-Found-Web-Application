export const storeUserData = (userToken, userStatus, userData) => ({
  type: "STORE_USER_DATA",
  payload: { userToken, userStatus, userData },
});

export const updatePhoneNumber = (phoneNo) => ({
  type: "UPDATE_PHONE_NUMBER",
  payload: { phoneNo },
});

export const updateDayScholarORhosteler = (dayScholarORhosteler) => ({
  type: "UPDATE_DAY_SCHOLAR_HOSTELER",
  payload: { dayScholarORhosteler },
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

export const tryFetchingData = () => ({
  type: "TRY_FETCHING",
});

export const doneFetchingData = () => ({
  type: "DONE_FETCHING",
});