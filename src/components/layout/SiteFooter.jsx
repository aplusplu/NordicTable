import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function SiteFooter() {
  return (
    <footer className="bg-[#1F1F1F] text-white border-t border-white/20">
      <div className="mx-auto max-w-[1430px] px-4 py-8 md:px-8 md:py-12 lg:px-[100px] lg:py-[50px]">
        {/* GRID LAYOUT */}
        <div className="flex flex-col gap-10 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* LOGO + TEXT */}
          <div>
            <img
              src="/media/logoWhite.png"
              alt="Nordic Table"
              className="h-[28px] md:h-[32px] lg:h-[36px] w-auto"
            />

            <p
              className="
              mt-5 max-w-[190px] text-white/80
              text-[12px] leading-5
              md:max-w-[240px] md:text-[14px]
              lg:max-w-[250px] lg:text-[18px] lg:leading-8
            "
            >
              Nordisk køkken med fokus på sæsonens råvarer, enkelhed og hygge.
              Velkommen til bordet.
            </p>

            <div className="mt-6 flex gap-4 md:gap-5 lg:mt-8">
              <a
                href="#"
                aria-label="Facebook"
                className="
                  grid place-items-center border border-white/30 text-white/90
                  h-12 w-12
                  md:h-11 md:w-11
                  lg:h-12 lg:w-12
                "
              >
                <FaFacebookF className="text-[18px] lg:text-[22px]" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="
                  grid place-items-center border border-white/30 text-white/90
                  h-12 w-12
                  md:h-11 md:w-11
                  lg:h-12 lg:w-12
                "
              >
                <FaInstagram className="text-[18px] lg:text-[22px]" />
              </a>
            </div>
          </div>

          {/* ÅBNINGSTIDER */}
          <div>
            <h3
              className="
              text-white/75 uppercase font-semibold
              tracking-[0.12em]
              text-[12px]
              md:text-[14px]
              lg:text-[18px] lg:tracking-[0.08em]
            "
            >
              Åbningstider
            </h3>

            <div
              className="
              mt-5 space-y-4 text-white/75
              text-[12px]
              md:text-[14px]
              lg:text-[18px]
            "
            >
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

          {/* LINKS */}
          <div>
            <h3
              className="
              text-white/75 uppercase font-semibold
              tracking-[0.12em]
              text-[12px]
              md:text-[14px]
              lg:text-[18px] lg:tracking-[0.08em]
            "
            >
              Hurtige links
            </h3>

            <div
              className="
  mt-5 space-y-4 text-white/75
  text-[12px]
  md:text-[14px]
  lg:text-[18px]
"
            >
              <Link
                to="/booking"
                className="block transition hover:text-[#C0A062]"
              >
                Book bord
              </Link>

              <Link
                to="/menu"
                className="block transition hover:text-[#C0A062]"
              >
                Menu
              </Link>

              <Link to="/" className="block transition hover:text-[#C0A062]">
                Forside
              </Link>

              <Link
                to="/login"
                className="block transition hover:text-[#C0A062]"
              >
                Log ind
              </Link>
            </div>
          </div>

          {/* KONTAKT */}
          <div>
            <h3
              className="
              text-white/75 uppercase font-semibold
              tracking-[0.12em]
              text-[12px]
              md:text-[14px]
              lg:text-[18px] lg:tracking-[0.08em]
            "
            >
              Kontakt os
            </h3>

            <div
              className="
              mt-5 space-y-5 text-white/75
              text-[12px]
              md:text-[14px]
              lg:text-[18px]
            "
            >
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
        </div>

        {/* BOTTOM BAR */}
        <div
          className="
          mt-10 border-t border-white/20 pt-5 text-white/40
          text-center text-[12px]
          md:text-[14px]
          lg:flex lg:items-center lg:justify-between lg:text-[16px]
        "
        >
          <p>© 2026 Nordic Table. Alle rettigheder forbeholdes</p>

          <p className="hidden lg:block">Designet og udviklet med omhu</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
