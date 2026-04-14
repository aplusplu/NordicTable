import { NavLink } from "react-router-dom";

function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] md:hidden">
      <div
        className="absolute inset-0 bg-[#F7F5F2]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-[#D9D3CA] px-4 py-6">
          <img
            src="/media/logoBlack.png"
            alt="Nordic Table"
            className="h-[31px] w-[50px] object-contain"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Luk menu"
            className="relative h-[29px] w-[29px]"
          >
            <span className="absolute left-1/2 top-1/2 block h-[2px] w-[24px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#929292]" />
            <span className="absolute left-1/2 top-1/2 block h-[2px] w-[24px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[#929292]" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) =>
              `font-cormorant text-[32px] leading-none ${
                isActive ? "text-[#916B1C]" : "text-[#6F6F6F]"
              }`
            }
          >
            Forside
          </NavLink>

          <NavLink
            to="/menu"
            onClick={onClose}
            className={({ isActive }) =>
              `font-cormorant text-[32px] leading-none ${
                isActive ? "text-[#916B1C]" : "text-[#6F6F6F]"
              }`
            }
          >
            Menu
          </NavLink>

          <NavLink
            to="/booking"
            onClick={onClose}
            className={({ isActive }) =>
              `font-cormorant text-[32px] leading-none ${
                isActive ? "text-[#916B1C]" : "text-[#6F6F6F]"
              }`
            }
          >
            Book bord
          </NavLink>

          <NavLink
            to="/login"
            onClick={onClose}
            className={({ isActive }) =>
              `font-cormorant text-[32px] leading-none ${
                isActive ? "text-[#916B1C]" : "text-[#6F6F6F]"
              }`
            }
          >
            Log ind
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
