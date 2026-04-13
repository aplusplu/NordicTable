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
    // useEffect runs after the component renders.
    // Using it here because fetching backend data is a side effect:
    // it happens outside the normal rendering flow.
    const fetchDishes = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = await getAllDishes();

        // The backend always wraps the real data inside result.data.
        // Checking result.status first so we can handle API errors safely.
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

  // useMemo avoids recalculating the filtered arrays on every render
  // unless the dishes array actually changes.
  // This is not mandatory for small lists, but it's good practice in React structure.

  return (
    <div className="min-h-screen bg-[#F9F6F1]">
      <SiteHeader light />

      <main>
        <PageHero
          eyebrow="Vores menu"
          title="Smagsoplevelser fra det nordiske køkken"
          text="Udforsk vores menukort med sæsonens bedste råvarer, tilberedt med fokus på kvalitet, enkelhed og hygge."
          image="/media/assets/headerbg.png"
          height="min-h-[210px] md:min-h-[320px]"
        />

        <section className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-16">
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
                <SectionHeading eyebrow="Forretter" title="Forretter" />
                <div className="mt-6 bg-transparent">
                  {starters.map((dish) => (
                    <DishRow key={dish._id} dish={dish} />
                  ))}
                </div>
              </section>

              <section>
                <SectionHeading eyebrow="Hovedretter" title="Hovedretter" />
                <div className="mt-6">
                  {mains.map((dish) => (
                    <DishRow key={dish._id} dish={dish} />
                  ))}
                </div>
              </section>

              <section>
                <SectionHeading eyebrow="Desserter" title="Desserter" />
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
