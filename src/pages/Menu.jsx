import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import DishRow from "../components/ui/DishRow";
import SiteHeader from "../components/layout/SiteHeader";
import SiteFooter from "../components/layout/SiteFooter";
import { getAllDishes } from "../services/dishService";

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetching data from the backend is a side effect, so it belongs in useEffect.
    // We only want this request to run once when the page first mounts.
    const fetchDishes = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = await getAllDishes();

        // The backend returns a wrapper object:
        // { status, message, data }
        // We validate status before using the actual dishes array.
        if (result.status !== "ok") {
          throw new Error(result.message || "Kunne ikke hente menuen.");
        }

        setDishes(result.data);
      } catch (error) {
        const message =
          error.message || "Der opstod en fejl ved hentning af menuen.";
        setErrorMessage(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishes();
  }, []);

  // useMemo prevents unnecessary recalculation on every render.
  // The filtered arrays are only recomputed when dishes changes.
  const starters = useMemo(
    () => dishes.filter((dish) => dish.category === "starter"),
    [dishes],
  );

  const mains = useMemo(
    () => dishes.filter((dish) => dish.category === "main"),
    [dishes],
  );

  const desserts = useMemo(
    () => dishes.filter((dish) => dish.category === "dessert"),
    [dishes],
  );

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <SiteHeader variant="light" />

      <main>
        <PageHero
          eyebrow="Vores menu"
          title="Smagsoplevelser fra det nordiske køkken"
          text="Alt på vores menu er tilberedt af sæsonens friskeste råvarer. Vi arbejder tæt med lokale producenter for at sikre den bedste kvalitet."
          image="/media/assets/headerbg.png"
          height="h-[258px] md:h-[420px]"
        />

        <section className="mx-auto max-w-[1440px] px-4 py-10 md:px-10 md:py-16 lg:px-[100px]">
          {isLoading && (
            <div className="rounded-md border border-[#D7C7A7] bg-white px-5 py-6 text-sm text-[#5F5F5F]">
              Henter menu...
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="rounded-md border border-red-200 bg-red-50 px-5 py-6 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {!isLoading && !errorMessage && (
            <div className="space-y-12 md:space-y-16">
              <section>
                <SectionHeading
                  title="Forretter"
                  image="/media/assets/appetizers.png"
                />
                <div className="mt-6">
                  {starters.map((dish) => (
                    <DishRow key={dish._id} dish={dish} />
                  ))}
                </div>
              </section>

              <section>
                <SectionHeading
                  title="Hovedretter"
                  image="/media/assets/mainCourses.png"
                />
                <div className="mt-6">
                  {mains.map((dish) => (
                    <DishRow key={dish._id} dish={dish} />
                  ))}
                </div>
              </section>

              <section>
                <SectionHeading
                  title="Desserter"
                  image="/media/assets/desserts.png"
                />
                <div className="mt-6">
                  {desserts.map((dish) => (
                    <DishRow key={dish._id} dish={dish} />
                  ))}
                </div>
              </section>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default Menu;
