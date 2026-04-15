import api from "./api";

// Send a real booking request to the backend.
// The backend expects:
// {
//   name: string,
//   email: string,
//   startAt: ISO date string,
//   numberOfGuests: number
// }
export async function createBooking(bookingData) {
  const response = await api.post("/booking", bookingData);
  return response.data;
}
