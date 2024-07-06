import { commonrequest } from "./ApiCall";
import { BACKEND_URL } from "./Helper";

export const loginFunction = async (registrationNo, password) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/login`, {
    registrationNo,
    password,
  });
};

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

export const verifyEmailFunction = async (email) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/otp-send`, {
    email,
  });
};

export const verifyOtpFucntion = async (email, otp) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/otp-verify`, {
    email,
    otp,
  });
};

export const resetPasswordFunction = async (email, newPassword) => {
  return await commonrequest("POST", `${BACKEND_URL}/api/v1/reset-password`, {
    email,
    newPassword,
  });
};