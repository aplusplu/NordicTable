import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn, signInWithToken } from "../../services/loginService"; // Import the login service

const initialForm = { // Initial state for the login form, with empty strings for email and password. This state will be updated as the user types into the form fields.
  email: "",
  password: "",
};

function LoginForm() { // LoginForm component that renders a login form and handles user authentication. It manages form state, handles input changes, and submits the login request to the backend.
  const [formData, setFormData] = useState(initialForm); // State to manage the form data, initialized with the initialForm object. This state will be updated as the user interacts with the form inputs. usestate is used to create a state variable formData and a function setFormData to update it. The initial value of formData is set to the initialForm object, which contains empty strings for email and password.
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage the submission status of the form. This is used to disable the submit button and show a loading state while the login request is being processed. Initially set to false, indicating that the form is not currently being submitted. usestate is used to create a state variable isSubmitting and a function setIsSubmitting to update it. constant isSubmitting is used to disable the submit button and show a loading state while the login request is being processed.
  const navigate = useNavigate();

  const handleChange = (event) => { // Handle changes to the form inputs. This function is called whenever the user types into the email or password fields. It updates the formData state with the latest values from the inputs. The name attribute of the input elements is used to determine which field is being updated (email or password), and the value is taken from the event target. The setFormData function is used to update the state, ensuring that we keep the existing values while only changing the specific field that was updated. event.target is used to access the input element that triggered the change event, and from it we extract the name and value to update the corresponding field in the formData state.
    const { name, value } = event.target;

    setFormData((prev) => ({ // Update the formData state by merging the previous state with the new value for the specific field that was changed. The prev parameter represents the previous state of formData, and we return a new object that contains all the previous values (using the spread operator) and updates only the field that corresponds to the name of the input that was changed. This ensures that we don't lose any existing data in formData when updating a single field. setformdata is used to update the formData state with the new value for the specific field that was changed, while keeping the other fields intact.
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => { //async event handler for form submission. This function is called when the user submits the login form. It prevents the default form submission behavior, validates the input, and then sends a login request to the backend using the signIn function from the login service. If the login is successful, it stores the token and user information in localStorage, shows a success toast, and navigates the user to the appropriate page based on their role. If there is an error during login, it catches the error and shows an error toast with the relevant message. The function also manages the isSubmitting state to provide feedback to the user while the login request is being processed.
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Udfyld venligst e-mail og adgangskode.");
      return;
    }

    try {
      setIsSubmitting(true); // Set isSubmitting to true to indicate that the login request is being processed. This will disable the submit button and can be used to show a loading state in the UI, providing feedback to the user that their login attempt is in progress.

      const result = await signIn({ //await signIn is used to call the signIn function from the login service, passing the user's email and password as credentials. The email is trimmed and converted to lowercase to ensure consistency before sending the request. The result of this call is expected to be an object containing status, message, and data fields. If the login is successful, the backend should return a token in the data field, which will be used for subsequent authentication. If the login fails, an error will be thrown, which will be caught in the catch block to show an error toast. const result is used to store the response from the signIn function, which contains the status of the login attempt, any message from the backend, and the data (including the token if login was successful). The credentials object passed to signIn includes the email and password entered by the user, with the email being trimmed and converted to lowercase for consistency.
        email: formData.email.trim().toLowerCase(), // Trim whitespace and convert the email to lowercase before sending it to the backend, ensuring that the email is in a consistent format for authentication.
        password: formData.password, // The password is sent as entered by the user without modification, as passwords are typically case-sensitive and should be handled exactly as provided.
      });

      if (result.status !== "ok" || !result.data?.token) { // Check if the login was not successful by verifying the status and the presence of a token in the response. If the status is not "ok" or if there is no token in the data, it means the login attempt failed. In this case, we throw an error with a message from the backend or a default error message. This error will be caught in the catch block to show an error toast to the user, informing them that the login attempt was unsuccessful. The presence of a token is crucial for authentication, so if it's missing, we treat it as a failed login attempt.
        throw new Error(result.message || "Login mislykkedes.");
      }

      const token = result.data.token;
      localStorage.setItem("token", token); // Store the authentication token in localStorage for persistent authentication across sessions. This token will be used for subsequent requests to the backend that require authentication. By saving it in localStorage, we ensure that the user remains logged in even if they refresh the page or close and reopen the browser, until they explicitly log out or the token expires.

      const tokenResult = await signInWithToken(token); // After successfully obtaining the token, we call signInWithToken to fetch the user's information based on the token. This is important because the token itself may not contain all the user details we need (like role), so we need to make an authenticated request to get that information. The result of this call is expected to be an object containing status, message, and data fields, where data should include the user's information if the token is valid. If the token is invalid or there is an error fetching the user info, it will be caught in the catch block to show an error toast.

      if (tokenResult.status === "ok" && tokenResult.data) { // Check if the token authentication was successful and if user data was returned. If the status is "ok" and there is user data in the response, we proceed to store the user information in localStorage. This allows us to have access to the user's details (like role) throughout the application, which can be used for things like route protection and displaying user-specific information. After storing the user info, we check the user's role to determine where to navigate them. If the user is an admin, we navigate them to the backoffice page; otherwise, we navigate them to the home page. This ensures that users are directed to the appropriate part of the application based on their permissions.
        localStorage.setItem("user", JSON.stringify(tokenResult.data)); // Store the user information in localStorage as a JSON string. This allows us to easily access the user's details (like role) throughout the application, which is essential for features like route protection and personalized content. By saving it in localStorage, we ensure that the user information persists across page refreshes and browser sessions until they log out or the data is cleared.

        const role = String(tokenResult.data.role || "").toLowerCase(); // Extract the user's role from the tokenResult data, ensuring that it is a string and converting it to lowercase for consistent comparison. This role will be used to determine where to navigate the user after a successful login. If the role is "admin", we will navigate them to the backoffice page; otherwise, we will navigate them to the home page. This check is crucial for implementing role-based access control in the application, ensuring that users are directed to the appropriate sections based on their permissions.

        toast.success("Du er nu logget ind.");
        setFormData(initialForm);

        if (role === "admin") {
          navigate("/backoffice");
          return;
        }

        navigate("/"); //else, if the user is not an admin, we navigate them to the home page. This ensures that regular users are directed to the main part of the application, while admins are taken to the backoffice where they can manage the system. After navigating, we return to prevent any further code execution in this function, as the navigation will cause a re-render of the component.
        return;
      }

      // Fallback: token exists, but user info could not be fetched
      toast.success("Du er nu logget ind.");
      setFormData(initialForm);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Der opstod en fejl ved login.");
    } finally {
      setIsSubmitting(false); // Set isSubmitting back to false after the login attempt is completed, regardless of whether it was successful or if an error occurred. This will re-enable the submit button and allow the user to attempt to log in again if needed. It's important to reset this state in the finally block to ensure that it happens in both success and error scenarios, providing a consistent user experience.
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-[54px] w-full max-w-[374px] space-y-[18px]"
    >
      <div>
        <label
          htmlFor="email"
          className="mb-[8px] block text-[15px] uppercase text-[#5F5F5F]"
        >
          E-MAIL
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email} // The value of the email input is bound to formData.email, allowing it to reflect the current state of the email field. The onChange handler updates this state whenever the user types in the input, ensuring that formData.email always contains the latest value entered by the user. This binding between the input value and the state allows us to easily access the current email value when submitting the form for authentication. The value attribute is essential for creating a controlled component in React, where the input's value is controlled by the component's state. This ensures that the displayed value in the input field is always in sync with the formData state, which is crucial for handling form submissions and validations effectively.
          onChange={handleChange} // The onChange handler for the email input is set to handleChange, which updates the formData state whenever the user types into the email field. This ensures that formData.email always contains the latest value entered by the user, allowing us to use this value when submitting the form for authentication.handleChange is a function that updates the formData state based on user input. When the user types into the email input, handleChange is called with the event, and it updates formData.email with the new value. This keeps the state in sync with the input field, allowing us to access the current email value when the form is submitted.
          placeholder="Jens Jensen"
          autoComplete="email"
          className="h-[36px] w-full border border-[#D9CBAF] bg-white px-[8px] text-[14px] text-[#1A1A1A] outline-none transition placeholder:text-[#9D9D9D] focus:border-[#916B1C]"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-[8px] block text-[15px] uppercase text-[#5F5F5F]"
        >
          ADGANGSKODE
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
          autoComplete="current-password"
          className="h-[36px] w-full border border-[#D9CBAF] bg-white px-[8px] text-[14px] text-[#1A1A1A] outline-none transition placeholder:text-[#9D9D9D] focus:border-[#916B1C]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting} // The submit button is disabled when isSubmitting is true, preventing the user from clicking the button multiple times while a login request is in progress. This provides a better user experience by avoiding duplicate submissions and potential issues with multiple login attempts. The disabled attribute is tied to the isSubmitting state, which is set to true when the login request starts and reset to false when the request completes (either successfully or with an error). This ensures that the button is only active when the form is ready for user interaction, and it provides visual feedback to the user that their login attempt is being processed.
        className="mt-[8px] h-[40px] w-full bg-black text-[14px] font-medium uppercase text-white shadow-[0_4px_4px_rgba(0,0,0,0.15)] transition hover:bg-[#1f1f1f] disabled:cursor-not-allowed disabled:opacity-70"
      >

        {isSubmitting ? "Logger ind..." : "Log ind"}
      </button>
    </form>
  );
}
//The button text changes based on the isSubmitting state. If isSubmitting is true, it shows "Logger ind..." to indicate that the login request is being processed. If isSubmitting is false, it shows "Log ind", which is the default state of the button when it's ready for user interaction. This dynamic text provides feedback to the user about the current state of their login attempt, improving the user experience by letting them know that their action is being processed. The disabled attribute of the but ton is also tied to the isSubmitting state, preventing multiple submissions while a login attempt is in progress.
export default LoginForm;
