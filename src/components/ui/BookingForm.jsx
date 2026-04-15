import { useState } from "react";
import { toast } from "react-toastify";
import { createBooking } from "../../services/bookingService";

const initialForm = { //constant object that defines the initial state of the form fields. Each field is initialized with an empty string, which allows us to easily reset the form after a successful submission.
  fullName: "",
  email: "",
  date: "",
  time: "",
  guests: "",
};

function BookingForm() {
  const [formData, setFormData] = useState(initialForm);  // const [formData, setFormData] = useState(initialForm); initializes the formData state with an object that has empty strings for each form field. This allows us to easily manage the state of the form inputs and reset them after submission.
  const [isSubmitting, setIsSubmitting] = useState(false); //usestate false means that the form is not currently being submitted. We can use this state to disable the submit button and show a loading state while the booking request is being processed.

  const handleChange = (event) => { //constant handleChange is a function that takes an event object as an argument. This function is called whenever a form input changes. It extracts the name and value of the changed input from the event.target and updates the formData state using the setFormData function. The previous state is spread into the new state object, and only the changed field is updated with its new value.
    const { name, value } = event.target; // Extract the name and value of the changed input from the event object.

    setFormData((prev) => ({ // Update the formData state by spreading the previous state and updating only the changed field with its new value.
      ...prev, // Spread the previous state to keep all other fields unchanged.
      [name]: value, // Update the specified field with the new value.
    }));
  };

  const handleSubmit = async (event) => { // Prevent the default form submission behavior, which would cause a page reload.. asynch event handler allows us to use await inside the function for cleaner asynchronous code.
    event.preventDefault();
 // Validate that all fields are filled out before submitting
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.date ||
      !formData.time || // Check if any of the form fields are empty. If so, show an error toast and return early to prevent submission.
      !formData.guests
    ) {
      toast.error("Udfyld venligst alle felter.");
      return;
    }

    try { // Set isSubmitting to true to indicate that the booking request is being processed. This can be used to disable the submit button and show a loading state.
      setIsSubmitting(true);

      // Combine the selected date and time into one ISO datetime string
      // because the backend stores booking time in the startAt field.
      const startAt = new Date(
        `${formData.date}T${formData.time}:00`,
      ).toISOString();

      const payload = { //const payload is an object that we will send to the backend when creating a booking. It includes the name, email, startAt (combined date and time), and numberOfGuests. The name and email are trimmed and formatted to ensure consistency before sending the request.
        name: formData.fullName.trim(),  // Trim whitespace from the full name to ensure clean data.
        email: formData.email.trim().toLowerCase(), // Trim whitespace and convert the email to lowercase for consistency.
        startAt,  // Use the combined date and time as the startAt field for the booking.
        numberOfGuests: Number(formData.guests), // Convert the guests field to a number before sending it to the backend, as the backend expects a number for this field.
      };

      const result = await createBooking(payload); // Await the response from the createBooking function, which sends the booking data to the backend. The result is expected to be an object containing status, message, and data fields.

      // The backend returns a wrapped response object:
      // { status, message, data }
      if (result.status !== "ok") { // Check if the status returned from the backend is not "ok". If it's not, throw an error with the message from the backend or a default error message. This will be caught in the catch block to show an error toast.
        throw new Error(result.message || "Kunne ikke oprette reservation.");
      }

      toast.success("Din reservation er sendt."); //otherwise, if the booking was successful, show a success toast to inform the user that their reservation has been sent.
      setFormData(initialForm); // Reset the form fields to their initial state (empty strings) after a successful submission, allowing the user to easily make another booking if desired.
    } catch (error) { // If an error occurs during the booking process (either from validation or from the backend), catch the error and show an error toast with the appropriate message. The message is extracted from the error object, checking for a response message from the backend first, then falling back to a general error message.
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Der opstod en fejl ved booking.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-[14px] border border-[#E7DDCB] bg-white p-[12px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] md:rounded-[10px] md:border md:border-[#DCCFB9] md:px-[28px] md:py-[26px] md:shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
      <h2 className="font-cormorant text-[20px] leading-[15px] text-[#1A1A1A] md:text-[42px] md:font-light md:leading-none">
        Din reservation
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-[14px] space-y-[14px] md:mt-8 md:space-y-5"
      >
        <div>
          <label
            htmlFor="fullName"
            className="mb-[6px] block text-[15px] font-normal uppercase text-[#5F5F5F] md:mb-2 md:text-[15px]"
          >
            FULDE NAVN *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Jens Jensen"
            className="h-[44px] w-full rounded-[5px] border border-[#CDB68A] bg-white px-[10px] text-[12px] text-[#1A1A1A] outline-none transition placeholder:text-[#9D9D9D] focus:border-[#916B1C] md:h-[50px] md:px-4 md:text-[14px]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-[6px] block text-[15px] font-normal uppercase text-[#5F5F5F] md:mb-2 md:text-[15px]"
          >
            EMAIL *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email} // The value of the email input is bound to formData.email, allowing it to reflect the current state of the email field. The onChange handler updates this state whenever the user types in the input, ensuring that formData.email always contains the latest value entered by the user.
            onChange={handleChange}
            placeholder="jens@example.dk"
            className="h-[44px] w-full rounded-[5px] border border-[#CDB68A] bg-white px-[10px] text-[12px] text-[#1A1A1A] outline-none transition placeholder:text-[#9D9D9D] focus:border-[#916B1C] md:h-[50px] md:px-4 md:text-[14px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-[10px] md:gap-4">
          <div>
            <label
              htmlFor="date"
              className="mb-[6px] block text-[15px] font-normal uppercase text-[#5F5F5F] md:mb-2 md:text-[15px]"
            >
              DATO *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="h-[44px] w-full rounded-[5px] border border-[#CDB68A] bg-white px-[10px] text-[12px] text-[#1A1A1A] outline-none transition focus:border-[#916B1C] md:h-[50px] md:px-4 md:text-[14px]"
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="mb-[6px] block text-[15px] font-normal uppercase text-[#5F5F5F] md:mb-2 md:text-[15px]"
            >
              TIDSPUNKT *
            </label>
            <select
              id="time"
              name="time"
              value={formData.time} // The value of the time select input is bound to formData.time, allowing it to reflect the current state of the time field. The onChange handler updates this state whenever the user selects a different time option, ensuring that formData.time always contains the latest selected value.
              onChange={handleChange}
              className="h-[44px] w-full rounded-[5px] border border-[#CDB68A] bg-white px-[10px] text-[12px] text-[#1A1A1A] outline-none transition focus:border-[#916B1C] md:h-[50px] md:px-4 md:text-[14px]"
            >
              <option value="">Vælg tidspunkt</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="guests"
            className="mb-[6px] block text-[15px] font-normal uppercase text-[#5F5F5F] md:mb-2 md:text-[15px]"
          >
            ANTAL GÆSTER *
          </label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="h-[44px] w-full rounded-[5px] border border-[#CDB68A] bg-white px-[10px] text-[12px] text-[#1A1A1A] outline-none transition focus:border-[#916B1C] md:h-[50px] md:px-4 md:text-[14px]"
          >
            <option value="">Vælg antal gæster</option>
            {Array.from({ length: 12 }, (_, index) => index + 1).map(
              (guest) => (
                <option key={guest} value={guest}>
                  {guest}
                </option>
              ),
            )}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-[49px] w-full bg-[#916B1C] text-[12px] font-medium uppercase text-white shadow-[0_4px_4px_rgba(0,0,0,0.15)] transition hover:bg-[#7f5d16] disabled:cursor-not-allowed disabled:opacity-70 md:h-[56px] md:text-[16px]"
        >
          {isSubmitting ? "Sender..." : "Book bord"}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
