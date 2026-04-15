import SiteHeader from "../components/layout/SiteHeader";
import SiteFooter from "../components/layout/SiteFooter";
import PageHero from "../components/ui/PageHero";
import BookingIntroSection from "../components/ui/BookingIntroSection";

function Booking() {
  return (
    <div className="min-h-screen bg-[#F9F6F1]">
      <SiteHeader variant="light" />

      <main>
        <PageHero
          variant="default"
          eyebrow="Reservationer"
          title="Book dit bord"
          text="Vi glæder os til at modtage dig. Book dit bord nedenfor, og vi sørger for resten."
          image="/media/assets/headerbg.png"
          height="h-[258px] md:h-[172px] lg:h-[420px]"
        />

        <BookingIntroSection />
      </main>

      <SiteFooter />
    </div>
  );
}

export default Booking;
