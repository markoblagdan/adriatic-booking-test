import { BASE_API_URL } from "./apiConstants";
import { postRequest, getRequest, deleteRequest } from "./baseFunctions";

export const saveBooking = async (booking) =>
  postRequest(BASE_API_URL + "/booking/", booking);

export const getBookings = async () => getRequest(BASE_API_URL + "/booking");

export const resolveBooking = async (id) =>
  postRequest(BASE_API_URL + "/booking/" + id + "/resolve");

export const deleteAllBookings = async () =>
  deleteRequest(BASE_API_URL + "/booking/");
