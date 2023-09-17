import axios from "../Util/axios";
import Swal from "sweetalert2";
import { setAccessToken, getAccessToken } from "../Util/helpers";

export const getUser = async () => {
  let { data } = await axios.get("/user/me");
  return data;
};