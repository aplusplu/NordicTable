import { NavLink } from "react-router-dom";

function MobileMenu({ isOpen, onClose, authUser, isAdmin, onLogout }) { // mobilemenu is a functional component that takes in several props: isOpen (a boolean that indicates whether the mobile menu should be displayed), onClose (a function that will be called to close the menu), authUser (an object representing the authenticated user, or null if no user is authenticated), isAdmin (a boolean indicating whether the authenticated user has admin privileges), and onLogout (a function that will be called to log the user out). These props are used to control the visibility of the menu, display different navigation options based on the user's authentication status and role, and handle user interactions such as closing the menu and logging out.
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

          {isAdmin && (
            <NavLink
              to="/backoffice"
              onClick={onClose}
              className={({ isActive }) =>
                `font-cormorant text-[32px] leading-none ${
                  isActive ? "text-[#916B1C]" : "text-[#6F6F6F]"
                }`
              }
            >
              Backoffice
            </NavLink>
          )}

          {!authUser ? (
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
          ) : (
            <button
              type="button"
              onClick={onLogout}
              className="font-cormorant text-[32px] leading-none text-[#6F6F6F] transition hover:text-[#916B1C]"
            >
              Log ud
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}

//MobileMenu component  conditionally renders based on the isOpen prop, displaying a full-screen overlay with navigation links when open.It handles user authentication by showing either a login link or a logout button based on the authUser prop. The onClose function is called when the user clicks outside the menu or on the close button, while the onLogout function is triggered when the user clicks the logout button. 

export default MobileMenu;
