import { BASE_API_URL } from "./apiConstants";
import { getRequest } from "./baseFunctions";

export const getHouses = async () => getRequest(BASE_API_URL + "/house");
