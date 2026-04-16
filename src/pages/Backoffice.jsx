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

function Backoffice() {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = await getAllDishes();

        if (result.status !== "ok") {
          throw new Error(result.message || "Kunne ikke hente retter.");
        }

        setDishes(Array.isArray(result.data) ? result.data : []);
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

  const handleCreateDish = async (newDishData) => {
    try {
      setIsBusy(true);

      const result = await createDish(newDishData);

      if (result.status !== "ok") {
        throw new Error(result.message || "Kunne ikke oprette ret.");
      }

      setDishes((prev) => [result.data, ...prev]);
      toast.success("Retten blev oprettet.");
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Der opstod en fejl ved oprettelse.");
      return false;
    } finally {
      setIsBusy(false);
    }
  };

  const handleUpdateDish = async (updatedDishData) => {
    try {
      setIsBusy(true);

      const result = await updateDish(updatedDishData);

      if (result.status !== "ok") {
        throw new Error(result.message || "Kunne ikke opdatere ret.");
      }

      setDishes((prev) =>
        prev.map((dish) => (dish._id === result.data._id ? result.data : dish)),
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

  const handleDeleteDish = async (dishId) => {
    try {
      setIsBusy(true);

      const result = await deleteDish(dishId);

      if (result.status !== "ok") {
        throw new Error(result.message || "Kunne ikke slette ret.");
      }

      setDishes((prev) => prev.filter((dish) => dish._id !== dishId));
      toast.success("Retten blev slettet.");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Der opstod en fejl ved sletning.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleToggleSignature = async (dishId) => {
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
  };

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
  );
}

export default Backoffice;
