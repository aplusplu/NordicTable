import SiteHeader from "../components/layout/SiteHeader";
import SiteFooter from "../components/layout/SiteFooter";
import PageHero from "../components/ui/PageHero";

function Home() {
  return (
    <div className="min-h-screen bg-[#F9F6F1]">
      <SiteHeader light />
      <PageHero
        eyebrow="Velkommen"
        title="Smag det nordiske"
        text="Nordic Table forener sæsonens råvarer med ro, kvalitet og hygge."
        image="/media/assets/headerbg.png"
      />
      <SiteFooter />
    </div>
  );
}

export default Home;
