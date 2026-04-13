import SiteHeader from "../components/layout/SiteHeader";
import SiteFooter from "../components/layout/SiteFooter";
import PageHero from "../components/ui/PageHero";

function Booking() {
  return (
    <div className="min-h-screen bg-[#F9F6F1]">
      <SiteHeader light />
      <PageHero
        eyebrow="Reservationer"
        title="Book dit bord"
        text="Vi glæder os til at modtage dig. Book dit bord nedenfor, og vi sørger for resten."
        image="/media/assets/headerbg.png"
        height="min-h-[210px] md:min-h-[320px]"
      />
      <section className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-16">
        <p className="text-[#5F5F5F]">Booking side kommer i næste trin.</p>
      </section>
      <SiteFooter />
    </div>
  );
}

export default Booking;
