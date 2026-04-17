import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaChevronDown } from "react-icons/fa";
import SiteHeader from "../components/layout/SiteHeader";
import SiteFooter from "../components/layout/SiteFooter";
import PageHero from "../components/ui/PageHero";
import HomeSignatureSection from "../components/ui/HomeSignatureSection";
import HomeAboutSection from "../components/ui/HomeAboutSection";
import HomeReservationSection from "../components/ui/HomeReservationSection";
import { getAllDishes } from "../services/dishService";

function Home() {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = await getAllDishes(); //await getAllDishes(); means "wait for the function to finish"

        if (result.status !== "ok") {
          throw new Error(result.message || "Kunne ikke hente retter."); // if the function returns an error then throw an error || means "or" - if result.message is falsy (undefined, null, empty string) then use the default message "Kunne ikke hente retter."
        }

        setDishes(Array.isArray(result.data) ? result.data : []); // If result.data is an array, use it; otherwise, use an empty array to prevent errors in the rest of the code that expects an array.
      } catch (error) {
        const message =
          error.message || "Der opstod en fejl ved hentning af retter.";
        setErrorMessage(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishes(); // We call the function to actually execute the data fetching when the component mounts.
  }, []); // [] means this effect runs only once when the component mounts.

  const signatureDishes = useMemo(() => {
    return dishes
      .filter(
        (dish) =>
          dish.signature === true ||  //why use true and "true"? Because the backend might return the value as a boolean (true) or as a string ("true"), depending on how the data is stored or processed. By checking for both, we ensure that we correctly identify signature dishes regardless of the format in which the data is returned.
          dish.signature === "true" ||
          dish.isSignature === true ||
          dish.isSignature === "true",
      )
      .slice(0, 3); //slice(0, 3) means "take the first 3 elements" [dishes[0], dishes[1], dishes[2]]
  }, [dishes]);

  const menuCount = dishes.length || 13;

  return (
    <div className="min-h-screen bg-[#F9F6F1]">
      <SiteHeader light />

      <main>
        <section className="relative">
          <PageHero
            variant="home"
            eyebrow="Velkomst"
            title={
              <>
                Smag det
                <br />
                nordiske
              </>
            }
            text={
              <>
                Nordic Table er et sted, hvor sæsonens <br />
                bedste råvarer forvandles til uforglemmelige <br />
                oplevelser. Ro, kvalitet og hygge i hvert eneste måltid.
              </>
            }
            image="/media/assets/headerbg.png"
            height="h-[527px] md:h-[820px]"
          >
            <SiteHeader light />
          </PageHero>

          <div className="absolute bottom-[74px] left-[20px] z-20 flex flex-wrap gap-[12px] md:bottom-[98px] md:left-[52px] md:gap-[18px]">
            <Link
              to="/booking"
              className="inline-flex h-[52px] min-w-[100px] items-center justify-center border border-[#916B1C] bg-[#916B1C] px-[18px] text-[12px] font-medium uppercase text-white shadow-[0_3px_4px_rgba(0,0,0,0.15)] transition hover:bg-[#7f5d16] md:h-[82px] md:min-w-[175px] md:px-[28px] md:text-[18px]"
            >
              Book bord
            </Link>

            <Link
              to="/menu"
              className="inline-flex h-[52px] min-w-[100px] items-center justify-center border border-white/55 bg-transparent px-[18px] text-[12px] font-medium uppercase text-white shadow-[0_3px_4px_rgba(0,0,0,0.15)] transition hover:bg-white/10 md:h-[82px] md:min-w-[175px] md:px-[28px] md:text-[18px]"
            >
              Se menuen
            </Link>
          </div>

          <a
            href="#signaturretter"
            className="absolute bottom-[22px] left-1/2 z-20 -translate-x-1/2 text-white/90 transition hover:text-white md:bottom-[34px]"
            aria-label="Scroll til signaturretter"
          >
            <FaChevronDown className="text-[18px] md:text-[24px]" />
          </a>
        </section>

        <HomeSignatureSection
          dishes={signatureDishes}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />

        <HomeAboutSection menuCount={menuCount} />

        <HomeReservationSection />
      </main>

      <SiteFooter />
    </div>
  );
}

export default Home;
