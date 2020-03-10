import axios from "axios";

const baseURL = "http://localhost:7000";

const myAxios = axios.create({ baseURL });

const getAuthorizationHeaders = (multipart = false) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": multipart ? "multipart/form-data" : null
    }
  };
};
export { getAuthorizationHeaders, baseURL };

export default myAxios;
