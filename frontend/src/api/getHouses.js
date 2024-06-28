import { getRequestWithNativeFetch } from "./getRequest";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export const getHouses = async () =>
  getRequestWithNativeFetch(BASE_API_URL + "/house");
