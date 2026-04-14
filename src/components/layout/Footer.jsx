import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A]/10 bg-[#1F1F1F] px-[10px] py-[20px] text-white md:hidden">
      <div className="space-y-[14px]">
        <div>
          <img
            src="/media/logoWhite.png"
            alt="Nordic Table"
            className="h-[28px] w-auto"
          />

          <p className="mt-5 max-w-[190px] text-[12px] leading-5 text-white/80">
            Nordisk køkken med fokus på sæsonens råvarer, enkelhed og hygge.
            Velkommen til bordet.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="grid h-12 w-12 place-items-center border border-white/30 text-white/90"
            >
              <FaFacebookF size={22} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-12 w-12 place-items-center border border-white/30 text-white/90"
            >
              <FaInstagram size={22} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/75">
            Åbningstider
          </h3>

          <div className="mt-5 space-y-4 text-[12px] text-white/70">
            <div className="flex justify-between">
              <span>Mandag</span>
              <span>Lukket</span>
            </div>
            <div className="flex justify-between">
              <span>Tirsdag-torsdag</span>
              <span>17-22</span>
            </div>
            <div className="flex justify-between">
              <span>Fredag-lørdag</span>
              <span>17-23</span>
            </div>
            <div className="flex justify-between">
              <span>Søndag</span>
              <span>12-20</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/75">
            Hurtige links
          </h3>

          <div className="mt-5 space-y-4 text-[12px] text-white/70">
            <p>Book bord</p>
            <p>Personale</p>
          </div>
        </div>

        <div>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/75">
            Kontakt os
          </h3>

          <div className="mt-5 space-y-4 text-[12px] text-white/70">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-[#C0A062]" />
              <span>Nordgade 12, 9000 Aalborg</span>
            </div>

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-[#C0A062]" />
              <span>+45 12 34 56 78</span>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-[#C0A062]" />
              <span>info@nordictable.dk</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-5 text-center text-[12px] text-white/45">
          © 2026 Nordic Table. Alle rettigheder forbeholdes
        </div>
      </div>
    </footer>
  );
}

export default Footer;
