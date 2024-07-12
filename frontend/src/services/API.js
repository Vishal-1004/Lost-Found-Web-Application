import { commonrequest } from "./ApiCall";
import { BACKEND_URL } from "./Helper";

// login function
export const loginFunction = async (registrationNo, password) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/login`, {
    registrationNo,
    password,
  });
};

// verfiy token function
export const verifyTokenFunction = async (token) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/verify-token`, {
    token
  });
};

// sign up  function
export const signupFunction = async (
  name,
  email,
  password,
  registrationNo,
  dayScholarORhosteler
) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/sign-up`, {
    name,
    email,
    password,
    registrationNo,
    dayScholarORhosteler,
  });
};

// email verification function
export const verifyEmailFunction = async (email) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/otp-send`, {
    email,
  });
};

// OTP verification function
export const verifyOtpFucntion = async (email, otp) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/otp-verify`, {
    email,
    otp,
  });
};

// reset password function
export const resetPasswordFunction = async (email, newPassword) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/reset-password`, {
    email,
    newPassword,
  });
};

// update hosteler-day-scholar info function
export const updateHostelerOrDayscholarFunction = async (email, dayScholarORhosteler) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/update-dayscholar-or-hosteler`, {
    email,
    dayScholarORhosteler,
  });
}

// updating phone number info function
export const updatePhoneNumberFunction = async (email, phoneNumber) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/update-phone-number`, {
    email,
    phoneNumber,
  });
}

// updating user password function
export const updatePasswordFunction = async (email, currentPassword,newPassword) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/update-password`, {
    email,
    currentPassword,
    newPassword
  });
}

// deleting user account function
export const deleteAccountFunction = async (email) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/delete-account`, {
    email,
  });
}

// creating found item post
export const createFoundItemPost = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/create-found-post`, data, {
    "Content-Type": "multipart/form-data",
  });
};

// getting found items
export const getFoundItemsFunction = async (all = 0,count = 5) => {
  return await commonrequest("GET",`${BACKEND_URL}/api/v1/get-found-items?all=${all}&count=${count}`)
}

// getting all users data for admin function
export const getAllUsersFunction = async (
  email,
  page = 1,
  search = "",
  limit = 5
) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/api/v1/get-all-users?page=${page}&search=${search}&limit=${limit}`,
    { email }
  );
};

// change status of registered users by admin
export const changeStatusOfRegisteredUsersFunction = async (userId,userToken,newStatus) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/api/v1/change-user-status`,
    { userId, userToken, newStatus}
  );
}

// Get  user profile graph data
export const getProfileGraphFunction = async (authToken) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/api/v1/get-graph-data`,
    { authToken}
  );
}