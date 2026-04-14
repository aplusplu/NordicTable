import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu";

function SiteHeader({ variant = "transparent" }) {
  const [isOpen, setIsOpen] = useState(false);

  const isTransparent = variant === "transparent";
  const isLight = variant === "light";
  const isDark = variant === "dark";

  const logoSrc =
    isTransparent || isDark ? "/media/logoWhite.png" : "/media/logoBlack.png";

  const desktopLinkBase =
    "text-[12px] font-semibold uppercase tracking-[0.04em] transition";

  const desktopLinkDefaultColor =
    isTransparent || isDark ? "text-white" : "text-[#1A1A1A]";

  const desktopLinkActiveColor = "text-[#C0A062]";
  const desktopLinkHoverColor = "hover:text-[#C0A062]";

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30 md:relative">
        {/* MOBILE */}
        <div className="mx-auto flex max-w-[1440px] items-start justify-end bg-transparent px-[26px] py-[14px] md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Åbn menu"
            className="relative z-40 h-[36px] w-[36px]"
          >
            <span className="absolute left-1/2 top-[9px] block h-[2px] w-[22px] -translate-x-1/2 bg-[#C0A062]" />
            <span className="absolute left-1/2 top-1/2 block h-[2px] w-[22px] -translate-x-1/2 -translate-y-1/2 bg-[#C0A062]" />
            <span className="absolute left-1/2 bottom-[9px] block h-[2px] w-[22px] -translate-x-1/2 bg-[#C0A062]" />
          </button>
        </div>

        {/* DESKTOP */}
        <div
          className={`mx-auto hidden max-w-[1440px] items-center justify-between md:flex ${
            isTransparent
              ? "absolute inset-x-0 top-0 px-[32px] pt-[28px] bg-transparent"
              : isLight
                ? "relative border-b border-[#E7E0D5] bg-white px-[30px] py-[13px]"
                : "relative bg-[#1A1A1A] px-[30px] py-[14px]"
          }`}
        >
          <Link to="/">
            <img src={logoSrc} alt="Nordic Table" className="h-[58px] w-auto" />
          </Link>

          <nav className="flex items-center gap-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${desktopLinkBase} ${
                  isActive
                    ? desktopLinkActiveColor
                    : `${desktopLinkDefaultColor} ${desktopLinkHoverColor}`
                }`
              }
            >
              Forside
            </NavLink>

            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `${desktopLinkBase} ${
                  isActive
                    ? desktopLinkActiveColor
                    : `${desktopLinkDefaultColor} ${desktopLinkHoverColor}`
                }`
              }
            >
              Menu
            </NavLink>

            <NavLink
              to="/booking"
              className={({ isActive }) =>
                `${desktopLinkBase} ${
                  isActive
                    ? desktopLinkActiveColor
                    : `${desktopLinkDefaultColor} ${desktopLinkHoverColor}`
                }`
              }
            >
              Bestil bord
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${desktopLinkBase} ${
                  isActive
                    ? desktopLinkActiveColor
                    : `${desktopLinkDefaultColor} ${desktopLinkHoverColor}`
                }`
              }
            >
              Log ind
            </NavLink>
          </nav>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default SiteHeader;
