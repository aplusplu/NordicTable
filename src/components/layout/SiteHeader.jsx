import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const navItems = [
  { to: "/", label: "Forside" },
  { to: "/menu", label: "Menu" },
  { to: "/booking", label: "Bestil bord" },
  { to: "/login", label: "Log ind" },
];

function SiteHeader({ light = true }) {
  const [isOpen, setIsOpen] = useState(false);

  const linkBase =
    "text-sm font-medium uppercase tracking-wide transition-colors duration-200";
  const linkColor = light
    ? "text-white/85 hover:text-[#C0A062]"
    : "text-[#1A1A1A] hover:text-[#916B1C]";

  const activeColor = light ? "text-[#C0A062]" : "text-[#916B1C]";

  return (
    <>
      <header
        className={`w-full ${
          light ? "bg-transparent absolute inset-x-0 top-0 z-30" : "bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 md:px-8 md:py-6">
          <Link to="/" className="shrink-0">
            <img
              src={light ? "/media/logoWhite.png" : "/media/logoBlack.png"}
              alt="Nordic Table"
              className="h-8 w-auto md:h-10"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeColor : `${linkColor}`}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            aria-label={isOpen ? "Luk menu" : "Åbn menu"}
            className={`grid h-9 w-9 place-items-center md:hidden ${
              light ? "text-[#C0A062]" : "text-[#916B1C]"
            }`}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <HiOutlineX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F6F1] md:hidden">
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-4">
            <img
              src="/media/logoBlack.png"
              alt="Nordic Table"
              className="h-7 w-auto"
            />
            <button
              type="button"
              aria-label="Luk menu"
              className="text-[#8C8C8C]"
              onClick={() => setIsOpen(false)}
            >
              <HiOutlineX size={26} />
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center gap-6 pt-28">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `font-cormorant text-[22px] ${
                    isActive ? "text-[#916B1C]" : "text-[#4B4B4B]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

export default SiteHeader;
