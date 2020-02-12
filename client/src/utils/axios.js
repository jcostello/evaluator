import axios from "axios";

var instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

export default instance;
