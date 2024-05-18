import Axios from "axios";

// Create an Axios instance with the appropriate adapter
const axios = Axios.create({
  baseURL: "http://localhost:8000/", //process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
