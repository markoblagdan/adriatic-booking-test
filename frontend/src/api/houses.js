import { BASE_API_URL } from "./apiConstants";
import { getRequest } from "./baseFunctions";

export const getHouses = async () => getRequest(BASE_API_URL + "/house");

export const getHouse = async (id) => getRequest(BASE_API_URL + "/house/" + id);

export const getHouseByApartmentId = async (apartmentId) =>
  getRequest(BASE_API_URL + "/house", {
    name: "apartmentId",
    value: apartmentId,
  });
