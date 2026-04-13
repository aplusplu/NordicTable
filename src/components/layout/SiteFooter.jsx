import { FaFacebookF, FaInstagram } from "react-icons/fa";

function SiteFooter() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-10 md:grid-cols-4 md:px-8 md:py-14">
        <div>
          <img
            src="/media/logoWhite.png"
            alt="Nordic Table"
            className="mb-4 h-9 w-auto"
          />
          <p className="max-w-[260px] text-sm leading-6 text-white/75">
            Nordisk køkken med fokus på sæsonens råvarer, enkelhed og hygge.
            Velkommen til bordet.
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center border border-white/20 text-white/80 transition hover:border-[#C0A062] hover:text-[#C0A062]"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center border border-white/20 text-white/80 transition hover:border-[#C0A062] hover:text-[#C0A062]"
            >
              <FaInstagram size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#C0A062]">
            Åbningstider
          </h3>
          <div className="space-y-2 text-sm leading-6 text-white/75">
            <p>Tirsdag-torsdag kl. 17-22</p>
            <p>Fredag-lørdag kl. 17-23</p>
            <p>Søndag kl. 12-20</p>
            <p>Mandag lukket</p>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#C0A062]">
            Hurtige links
          </h3>
          <div className="space-y-2 text-sm leading-6 text-white/75">
            <p>Forside</p>
            <p>Menu</p>
            <p>Bestil bord</p>
            <p>Log ind</p>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#C0A062]">
            Kontakt os
          </h3>
          <div className="space-y-2 text-sm leading-6 text-white/75">
            <p>+45 12 34 56 78</p>
            <p>info@nordictable.dk</p>
            <p>Havnegade 12</p>
            <p>8000 Aarhus C</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/45">
        © 2026 Nordic Table. Alle rettigheder forbeholdes.
      </div>
    </footer>
  );
}

export default SiteFooter;
