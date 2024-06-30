import { BASE_API_URL } from "./apiConstants";
import { getRequest, postRequest } from "./baseFunctions";

export const getApartment = async (id) =>
  getRequest(BASE_API_URL + "/apartment/" + id);

export const calculateBookingPrice = async (
  apartmentId,
  { startDate, endDate }
) =>
  postRequest(
    BASE_API_URL + "/apartment/" + apartmentId + "/calculateBookingPrice",
    {
      startDate,
      endDate,
    }
  );
