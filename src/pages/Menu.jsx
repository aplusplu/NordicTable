import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import DishRow from "../components/ui/DishRow";
import SiteHeader from "../components/layout/SiteHeader";
import SiteFooter from "../components/layout/SiteFooter";
import { getAllDishes } from "../services/dishService";
import MenuFilters from "../components/ui/MenuFilters";

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

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

  // Apply filtering, search and sorting before splitting into sections
  const filteredDishes = useMemo(() => {
    let result = [...dishes];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((dish) => dish.category === selectedCategory);
    }

    // Search by title. if searchTerm is empty, don't filter. if searchTerm is not empty, filter by title. if searchTerm is not empty, normalize the search term by converting it to lowercase and trimming whitespace. This allows for a more flexible search that is not affected by case sensitivity or accidental spaces. The filter then checks if the dish title includes the normalized search term, allowing users to find dishes even if they don't type the exact title or if there are variations in capitalization and spacing.
    if (searchTerm.trim()) {
      const normalized = searchTerm.toLowerCase().trim();

      result = result.filter((dish) =>
        dish.title.toLowerCase().includes(normalized),
      );
    }

    // Sort by price. if sortOrder is "default", don't sort. if sortOrder is "price-asc", sort by price ascending. if sortOrder is "price-desc", sort by price descending.
    if (sortOrder === "price-asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortOrder === "price-desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [dishes, selectedCategory, searchTerm, sortOrder]);
  // useMemo prevents unnecessary recalculation on every render.
  // The filtered arrays are only recomputed when dishes changes.
  const starters = useMemo(
    () => filteredDishes.filter((dish) => dish.category === "starter"), // Filter by category and return only dishes that match the "starter" category. This creates a new array that contains only the starter dishes, which can then be rendered in the "Forretter" section of the menu. The useMemo hook ensures that this filtering operation is only performed when the filteredDishes array changes, optimizing performance by avoiding unnecessary recalculations on every render.
    [filteredDishes],
  );

  const mains = useMemo(
    () => filteredDishes.filter((dish) => dish.category === "main"),
    [filteredDishes],
  );

  const desserts = useMemo(
    () => filteredDishes.filter((dish) => dish.category === "dessert"),
    [filteredDishes],
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
          <MenuFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
          {isLoading && ( // Loading state indication and error message for user experience provide feedback to the user about what's happening in the background (e.g., data is being fetched, or an error occurred). This helps manage user expectations and can prevent confusion or frustration.
            <div className="rounded-md border border-[#D7C7A7] bg-white px-5 py-6 text-sm text-[#5F5F5F]">
              Henter menu...
            </div>
          )}

          {!isLoading && errorMessage && ( //&& means "and". This condition checks if the data is not currently loading and if there is an error message to display. If both conditions are true, it renders a div with the error message. This ensures that the error message is only shown when there is an actual error and not while the data is still being fetched.
            <div className="rounded-md border border-red-200 bg-red-50 px-5 py-6 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {!isLoading && !errorMessage && ( // This condition checks if the data is not currently loading and if there is no error message. If both conditions are true, it means that the data has been successfully fetched and is ready to be displayed. In this case, it renders the menu sections with the filtered dishes. This ensures that the menu is only shown when there are no loading or error states, providing a better user experience.
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
