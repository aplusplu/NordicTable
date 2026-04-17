import AdminDishRow from "./AdminDishRow";
import AdminDishMobileCard from "./AdminDishMobileCard";

// function AdminDishTable is responsible for displaying a list of dishes in a table format for desktop and a card format for mobile. It handles loading states, error messages, and the case when there are no dishes to display. The component receives props for the list of dishes, loading state, error message, and functions for updating, deleting, and toggling signature status of dishes. It conditionally renders content based on the state of the data and user interactions. The table includes columns for the dish title, description, type, price, image, signature status, and actions. The mobile card layout provides a more compact view of the same information for smaller screens. The component also handles user interactions such as updating, deleting, and toggling signature status of dishes through the provided callback functions. Overall, AdminDishTable is a key component in the backoffice section for managing the menu items effectively.
// isbusy is used to disable interactions while an update or delete operation is in progress, ensuring a smooth user experience and preventing multiple simultaneous actions that could lead to inconsistent states. The component also provides feedback to the user through loading indicators and error messages, enhancing the overall usability of the backoffice interface.
// //ontogglesignature is used to toggle the signature status of a dish, allowing the user to mark or unmark dishes as signature items. ondelete is used to handle the deletion of a dish, providing a way for the user to remove dishes from the menu. onupdate is used to handle updates to a dish's information, allowing the user to edit details such as the title, description, price, and category. The component ensures that all interactions are properly managed and that the user receives appropriate feedback based on the actions taken.
// onupdate, ondelete, and ontogglesignature are passed down to the AdminDishRow and AdminDishMobileCard components, which handle the specific interactions for each dish in the table and mobile card layouts, respectively. This separation of concerns allows for a cleaner and more maintainable codebase, as the AdminDishTable component focuses on the overall structure and state management, while the child components handle the individual dish interactions.
//dishes is an array of dish objects that are displayed in the table and mobile card layouts. Each dish object contains information such as the title, description, category, price, image, and signature status. The component maps over the dishes array to render a row for each dish in the desktop table and a card for each dish in the mobile layout. The dishes data is typically fetched from an API and stored in the parent component's state, which is then passed down to AdminDishTable as a prop. This allows for dynamic rendering of the menu items based on the current state of the data. The component also handles cases where there are no dishes to display, showing an appropriate message to the user.

function AdminDishTable({ // the AdminDishTable component displays a list of dishes in a table format for desktop and a card format for mobile. It handles loading states, error messages, and the case when there are no dishes to display. The component receives props for the list of dishes, loading state, error message, and functions for updating, deleting, and toggling signature status of dishes. It conditionally renders content based on the state of the data and user interactions. The table includes columns for the dish title, description, type, price, image, signature status, and actions. The mobile card layout provides a more compact view of the same information for smaller screens. The component also handles user interactions such as updating, deleting, and toggling signature status of dishes through the provided callback functions. Overall, AdminDishTable is a key component in the backoffice section for managing the menu items effectively.
  dishes,
  isLoading,
  errorMessage,
  onUpdate,
  onDelete,
  onToggleSignature,
  isBusy,
}) {
  if (isLoading) {
    return (
      <div className="py-12 text-center text-[16px] text-[#5F5F5F]">
        Indlæser retter...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="py-12 text-center text-[16px] text-red-600">
        {errorMessage}
      </div>
    );
  }

  if (!dishes.length) { // if there are no dishes to display, we check if the dishes array  has a length of 0. If it is empty, we return a message "Ingen retter endnu." to inform the user that there are currently no dishes available. This provides feedback to the user in cases where the menu has not been populated yet or if all dishes have been removed. It enhances the user experience by clearly communicating the state of the data and preventing confusion that might arise from an empty table or card layout without any indication of why it's empty.
    return (
      <div className="py-12 text-center text-[16px] text-[#5F5F5F]">
        Ingen retter endnu.
      </div>
    );
  }

  //if !dishes.length is used to check if there are no dishes to display. If the dishes array is empty, it renders a message "Ingen retter endnu." to inform the user that there are currently no dishes available. This provides feedback to the user in cases where the menu has not been populated yet or if all dishes have been removed. It enhances the user experience by clearly communicating the state of the data and preventing confusion that might arise from an empty table or card layout without any indication of why it's empty.

  return (
    <div className="mt-[28px] md:mt-[38px]">
      <table className="hidden w-full table-fixed border-collapse md:table">
        <colgroup>
          <col className="w-[15%]" />
          <col className="w-[26%]" />
          <col className="w-[12%]" />
          <col className="w-[10%]" />
          <col className="w-[14%]" />
          <col className="w-[10%]" />
          <col className="w-[13%]" />
        </colgroup>

        <thead>
          <tr className="border-y border-[#CDB68A] text-left">
            <th className="px-3 py-4 text-[14px] font-normal text-[#1A1A1A]">
              Titel
            </th>
            <th className="px-3 py-4 text-[14px] font-normal text-[#1A1A1A]">
              Beskrivelse
            </th>
            <th className="px-3 py-4 text-[14px] font-normal text-[#1A1A1A]">
              Type
            </th>
            <th className="px-3 py-4 text-[14px] font-normal text-[#1A1A1A]">
              Pris
            </th>
            <th className="px-3 py-4 text-[14px] font-normal text-[#1A1A1A]">
              Billede
            </th>
            <th className="px-3 py-4 text-[14px] font-normal text-[#1A1A1A]">
              Signaturret
            </th>
            <th className="px-3 py-4 text-[14px] font-normal text-[#1A1A1A]">
              Handlinger
            </th>
          </tr>
        </thead>


        <tbody>
          {dishes.map((dish) => (
            <AdminDishRow
              key={dish._id}
              dish={dish}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onToggleSignature={onToggleSignature}
              isBusy={isBusy}
            />
          ))}
        </tbody>
      </table>

      <div className="md:hidden">
        {dishes.map((dish) => (
          <AdminDishMobileCard
            key={dish._id}
            dish={dish}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggleSignature={onToggleSignature}
            isBusy={isBusy}
          />
        ))}
      </div>
    </div>
  );
}

// The table header defines the columns for the dish information, including title, description, type, price, image, signature status, and actions. Each column has specific styling for padding, font size, and color to ensure a clear and organized presentation of the data. The "Handlinger" column is reserved for action buttons that allow the user to edit, delete, or toggle the signature status of each dish. The use of a table layout provides a structured way to display multiple dishes and their attributes in a way that is easy to scan and manage for desktop users.
//dishes.map is used to iterate over the array of dish objects and render a corresponding AdminDishRow component for each dish in the desktop table layout. Each AdminDishRow receives props for the dish data, as well as the onUpdate, onDelete, onToggleSignature functions, and the isBusy state to manage interactions. This allows for a dynamic rendering of the dish information in the table format, where each row corresponds to a specific dish and provides the necessary functionality for managing that dish within the backoffice interface. The key prop is set to dish._id to ensure that each row has a unique identifier, which helps React efficiently update and manage the list of dishes when changes occur.
//tbody is used to group the rows of the table that display the dish information. It allows for better organization and styling of the table content. By wrapping the dish rows in a tbody element, it provides a clear separation between the table header (thead) and the body of the table, which contains the actual data. This structure also enables easier manipulation of the table content, such as adding or removing rows, without affecting the header or overall table layout. The tbody element is a standard part of HTML tables and helps ensure that the table is semantically correct and accessible.
//key is set to dish._id when mapping over the dishes array to render AdminDishRow components. This provides a unique identifier for each row in the table, which is essential for React's reconciliation process. By using a unique key, React can efficiently update and manage the list of dishes when changes occur, such as adding, updating, or deleting dishes. The key helps React determine which items have changed, been added, or been removed, allowing for optimal rendering performance and a smoother user experience when interacting with the backoffice interface.
//ondelete={onDelete} is passed as a prop to each AdminDishRow component, allowing the child component to call the onDelete function when a user initiates a delete action for a specific dish. This enables the AdminDishRow component to handle the deletion of a dish by invoking the onDelete function with the appropriate dish ID or data, which is typically defined in the parent component that manages the state of the dishes. By passing down the onDelete function as a prop, it promotes a clear separation of concerns and allows for better code organization, as the AdminDishRow component can focus on rendering the dish information and handling user interactions, while the parent component manages the overall state and logic for updating and deleting dishes in the menu.
export default AdminDishTable;
