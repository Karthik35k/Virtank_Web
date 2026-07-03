import axios from "axios";

const API = axios.create({
  baseURL: "https://virtank-backend.onrender.com",
});

export default API;