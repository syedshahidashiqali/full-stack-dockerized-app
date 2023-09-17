export const setAccessToken = (token) => {
  localStorage.setItem("user_token", token);
};
export const getAccessToken = () => localStorage.getItem("user_token");
export const removeAccessToken = () => localStorage.removeItem("user_token");
