import axios from "../Util/axios";
import Swal from "sweetalert2";
import { setAccessToken } from "../Util/helpers";

export const login = async (formData) => {
  try {

    let { data } = await axios.post("auth/login", formData);

    setAccessToken(data.detail.token);

    Swal.fire(
      "Logged In!",
      `${data.message}`,
      "success"
    );

    return data;

  } catch (error) {

    Swal.fire(
      "Login Failed!",
      `${error.response.data.message}`,
      "error"
    );

  }
};

export const register = async (formData) => {
  try {

    let { data } = await axios.post("auth/signup", formData);

    Swal.fire(
      "Sign Up Successfull!",
      `${data.message}`,
      "success"
    );

    return data;

  } catch (error) {

    Swal.fire(
      "Sign Up Failed!",
      `${error.response.data.message}`,
      "error"
    );

  }
};
