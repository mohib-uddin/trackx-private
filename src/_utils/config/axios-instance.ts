import axios from "axios";

import { API_BASEURL } from "@/_utils/constants";

const instance = axios.create({
  baseURL: API_BASEURL,
});

export default instance;
