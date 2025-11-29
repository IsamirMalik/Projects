import axios from "axios";

const BASE_URL = "http://localhost:5000";

const axiosInstanse = axios.create();

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export default axiosInstanse;