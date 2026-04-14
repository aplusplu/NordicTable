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

        const result = await getAllDishes();

        if (result.status !== "ok") {
          throw new Error(result.message || "Kunne ikke hente retter.");
        }

        setDishes(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        const message =
          error.message || "Der opstod en fejl ved hentning af retter.";
        setErrorMessage(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const signatureDishes = useMemo(() => {
    return dishes
      .filter(
        (dish) =>
          dish.signature === true ||
          dish.signature === "true" ||
          dish.isSignature === true ||
          dish.isSignature === "true",
      )
      .slice(0, 3);
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
