import axios from "axios";

const API = axios.create({
  baseURL: "https://virtank-web.vercel.app/api",
});

export default API;