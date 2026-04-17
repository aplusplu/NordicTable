import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BackofficeHeader from "../components/ui/BackofficeHeader";
import BackofficeSectionHeader from "../components/ui/BackofficeSectionHeader";
import AdminDishCreateForm from "../components/ui/AdminDishCreateForm";
import AdminDishTable from "../components/ui/AdminDishTable";
import {
  createDish,
  deleteDish,
  getAllDishes,
  toggleDishSignature,
  updateDish,
} from "../services/dishService";

function Backoffice() { //function backoffice is the main component for the backoffice page. It manages the state of the dishes and handles the CRUD operations for the dishes. It also renders the header, section header, create form and dish table components. The component uses useEffect to fetch the dishes from the backend when it mounts, and it defines handler functions for creating, updating, deleting and toggling signature status of dishes. These handler functions interact with the dishService to perform the necessary API calls and update the local state accordingly. The component also manages loading and error states to provide feedback to the user during these operations.
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => { //useeffect here is used to fetch the dishes from the backend when the component mounts. The empty dependency array [] means that this effect will only run once, when the component is first rendered. Inside the effect, we define an asynchronous function, meaning we use await to wait for the fetchDishes that performs the API call to get all dishes using the getAllDishes service function. We handle loading and error states to provide feedback to the user. If the API call is successful, we update the dishes state with the data received from the backend. If there's an error, we catch it and set an appropriate error message. Finally, setting isLoading to false to indicate that the loading process has completed, regardless of success or failure.
    const fetchDishes = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = await getAllDishes();

        if (result.status !== "ok") {
          throw new Error(result.message || "Kunne ikke hente retter.");
        }

        setDishes(Array.isArray(result.data) ? result.data : []); //setdishes with the data received from the backend. We check if result.data is an array before setting it to ensure that we don't run into errors later when we try to map over the dishes. If result.data is not an array (e.g., it's undefined, null, or an object), we set dishes to an empty array instead. This is a defensive programming practice to prevent potential runtime errors in the rest of the component that expects dishes to be an array.
      } catch (error) {
        console.error(error);
        setErrorMessage(
          error.message || "Der opstod en fejl ved hentning af retter.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const handleCreateDish = async (newDishData) => { //handlecreatedish is an asynchronous function that handles the creation of a new dish. It takes a newDishData object as an argument, which contains the data for the new dish to be created. The function uses a try-catch block to manage the asynchronous operation and handle any potential errors that may occur during the API call. Inside the try block, it sets the isBusy state to true to indicate that a creation operation is in progress. It then calls the createDish service function with the newDishData, which sends a request to the backend to create the dish. If the response indicates success (status "ok"), it updates the local dishes state by adding the newly created dish to the beginning of the array. It also shows a success toast notification to inform the user that the dish was created successfully. If there's an error during this process (e.g., validation error from the backend, network issue), it catches the error, logs it, and shows an error toast notification with an appropriate message. Finally, it sets isBusy back to false to indicate that the creation operation has completed, regardless of success or failure.
    try {
      setIsBusy(true);

      const result = await createDish(newDishData);

      if (result.status !== "ok") {
        throw new Error(result.message || "Kunne ikke oprette ret.");
      }

      setDishes((prev) => [result.data, ...prev]); //setdishes with the new dish added to the beginning of the array. We use the functional form of setState here (passing a function to setDishes) to ensure that we are working with the most up-to-date state. The function takes the previous state (prev) as an argument and returns a new array that includes the newly created dish (result.data) followed by all the existing dishes (...prev). This way, the new dish appears at the top of the list in the UI.
      toast.success("Retten blev oprettet.");
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Der opstod en fejl ved oprettelse.");
      return false;
    } finally {
      setIsBusy(false); //setisbusy back to false to indicate that the creation operation has completed, regardless of success or failure. This is important for managing the UI state, such as disabling/enabling buttons or showing/hiding loading indicators during the asynchronous operation.
    }
  };

  const handleUpdateDish = async (updatedDishData) => { //handleupdatedish is an asynchronous function that handles the updating of an existing dish. It takes an updatedDishData object as an argument, which contains the updated data for the dish, including its id. The function uses a try-catch block to manage the asynchronous operation and handle any potential errors that may occur during the API call. Inside the try block, it sets the isBusy state to true to indicate that an update operation is in progress. It then calls the updateDish service function with the updatedDishData, which sends a request to the backend to update the dish. If the response indicates success (status "ok"), it updates the local dishes state by mapping over the existing dishes and replacing the old dish with the updated one based on matching ids. It also shows a success toast notification to inform the user that the dish was updated successfully. If there's an error during this process (e.g., validation error from the backend, network issue), it catches the error, logs it, and shows an error toast notification with an appropriate message. Finally, it sets isBusy back to false to indicate that the update operation has completed, regardless of success or failure.
    try {
      setIsBusy(true); //setisbusy true to indicate that an update operation is in progress to disable form inputs or show a loading indicator while the update is being processed, improving the user experience by providing feedback that their action is being handled.

      const result = await updateDish(updatedDishData);

      if (result.status !== "ok") {
        throw new Error(result.message || "Kunne ikke opdatere ret.");
      }

      setDishes((prev) =>
        prev.map((dish) => (dish._id === result.data._id ? result.data : dish)), //prev.map means we are creating a new array by mapping over the previous dishes state. For each dish in the previous state, we check if its _id matches the _id of the updated dish (result.data._id). If it matches, we replace that dish with the updated dish data (result.data); if it doesn't match, we keep the original dish unchanged. This way, we update only the specific dish that was edited while keeping the rest of the dishes intact in the state. The use of map allows us to create a new array with the updated dish, which is important for React's state management to trigger a re-render of the component with the new data.
      );

      toast.success("Retten blev opdateret.");
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Der opstod en fejl ved redigering.");
      return false;
    } finally {
      setIsBusy(false);
    }
  };

  const handleDeleteDish = async (dishId) => { //handle and delete a dish by its id. It takes the dishId as an argument, which is the unique identifier of the dish to be deleted. The function uses a try-catch block to manage the asynchronous operation and handle any potential errors that may occur during the API call. Inside the try block, it sets the isBusy state to true to indicate that a delete operation is in progress. It then calls the deleteDish service function with the dishId, which sends a request to the backend to delete the dish. If the response indicates success (status "ok"), it updates the local dishes state by filtering out the deleted dish based on its id. It also shows a success toast notification to inform the user that the dish was deleted successfully. If there's an error during this process (e.g., validation error from the backend, network issue), it catches the error, logs it, and shows an error toast notification with an appropriate message. Finally, it sets isBusy back to false to indicate that the delete operation has completed, regardless of success or failure.
    try {
      setIsBusy(true);

      const result = await deleteDish(dishId);

      if (result.status !== "ok") {
        throw new Error(result.message || "Kunne ikke slette ret.");
      }

      setDishes((prev) => prev.filter((dish) => dish._id !== dishId)); //setdishes with the deleted dish removed from the array, using the filter method to create a new array that includes only the dishes whose _id does not match the dishId of the deleted dish. This effectively removes the deleted dish from the state, which will then update the UI to reflect that the dish has been removed from the list.
      toast.success("Retten blev slettet.");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Der opstod en fejl ved sletning.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleToggleSignature = async (dishId) => { //singature status of a dish by its id. It takes the dishId as an argument, which is the unique identifier of the dish for which the signature status should be toggled. The function uses a try-catch block to manage the asynchronous operation and handle any potential errors that may occur during the API call. Inside the try block, it sets the isBusy state to true to indicate that a toggle operation is in progress. It then calls the toggleDishSignature service function with the dishId, which sends a request to the backend to toggle the signature status of the dish. If the response indicates success (status "ok"), it updates the local dishes state by mapping over the existing dishes and replacing the old dish with the updated one based on matching ids. It also shows a success toast notification to inform the user that the signature status was updated successfully. If there's an error during this process (e.g., validation error from the backend, network issue), it catches the error, logs it, and shows an error toast notification with an appropriate message. Finally, it sets isBusy back to false to indicate that the toggle operation has completed, regardless of success or failure.
    try {
      setIsBusy(true);

      const result = await toggleDishSignature(dishId);

      if (result.status !== "ok") {
        throw new Error(result.message || "Kunne ikke ændre signaturstatus.");
      }

      setDishes((prev) =>
        prev.map((dish) => (dish._id === result.data._id ? result.data : dish)),
      );

      toast.success("Signaturstatus blev opdateret.");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Der opstod en fejl ved signaturændring.");
    } finally {
      setIsBusy(false);
    }
  }; // The above functions (handleCreateDish, handleUpdateDish, handleDeleteDish, handleToggleSignature) are responsible for managing the CRUD operations for dishes in the backoffice. They interact with the dishService to perform API calls and update the local state accordingly, while also providing user feedback through toast notifications and managing loading states with isBusy.

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <BackofficeHeader />
      <BackofficeSectionHeader />

      <main className="bg-[#F7F5F2] px-[20px] py-[30px] md:px-[80px] md:py-[60px]">
        <div className="mx-auto max-w-[1440px]">
          <AdminDishCreateForm onCreate={handleCreateDish} isBusy={isBusy} />

          <div className="mx-auto mt-[28px] w-full max-w-[990px]">
            <AdminDishTable
              dishes={dishes}
              isLoading={isLoading}
              errorMessage={errorMessage}
              onUpdate={handleUpdateDish}
              onDelete={handleDeleteDish}
              onToggleSignature={handleToggleSignature}
              isBusy={isBusy}
            />
          </div>
        </div>
      </main>
    </div>
  ); // The return statement renders the JSX for the backoffice page, including the header, section header, create form, and dish table. It passes the necessary props to the child components to manage the state and operations related to dishes effectively. The AdminDishCreateForm component receives the handleCreateDish function and isBusy state to manage the creation of new dishes, while the AdminDishTable component receives the list of dishes, loading and error states, and handler functions for updating, deleting, and toggling signature status of dishes. This structure allows for a clear separation of concerns and efficient management of the dish-related functionalities in the backoffice section of the application.
}
// above code defines the Backoffice component, which is responsible for managing the state and operations related to dishes in the backoffice section of the application. It includes functionality for fetching, creating, updating, deleting, and toggling the signature status of dishes, as well as handling loading and error states to provide feedback to the user. The component renders a header, a section header, a form for creating new dishes, and a table that displays the existing dishes with options to edit or delete them. The use of async/await and try-catch blocks ensures that asynchronous operations are handled gracefully, with appropriate user feedback through toast notifications.
export default Backoffice;
