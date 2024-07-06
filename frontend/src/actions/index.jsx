export const storeUserData = (userToken, userStatus, userName) => ({
  type: "STORE_USER_DATA",
  payload: { userToken, userStatus, userName },
});

export const removeUserData = () => ({
  type: "REMOVE_USER_DATA",
});
