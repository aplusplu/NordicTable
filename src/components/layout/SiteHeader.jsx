import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";

function SiteHeader({ variant = "transparent" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [authUser, setAuthUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  const isTransparent = variant === "transparent";
  const isLight = variant === "light";
  const isDark = variant === "dark";

  const logoSrc =
    isTransparent || isDark ? "/media/logoWhite.png" : "/media/logoBlack.png";

  const desktopLinkBase =
    "text-[12px] font-semibold uppercase tracking-[0.04em] transition-colors duration-150";

  const desktopLinkDefaultColor =
    isTransparent || isDark ? "text-white" : "text-[#1A1A1A]";

  const desktopLinkActiveColor = "text-[#C0A062]";
  const desktopLinkHoverColor = "hover:text-[#C0A062]";

  // Keep navbar auth state in sync with localStorage changes.
  // This covers login/logout changes made elsewhere in the app.
  useEffect(() => {
    const syncAuthState = () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (!token || !savedUser) {
        setAuthUser(null);
        return;
      }

      try {
        setAuthUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        setAuthUser(null);
      }
    };

    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth-changed", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth-changed", syncAuthState);
    };
  }, []);

  const isAdmin = String(authUser?.role || "").toLowerCase() === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthUser(null);
    setIsOpen(false);
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/");
  };

  const getDesktopLinkClassName = ({ isActive }) =>
    `${desktopLinkBase} ${
      isActive
        ? desktopLinkActiveColor
        : `${desktopLinkDefaultColor} ${desktopLinkHoverColor}`
    }`;

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
          className={`hidden md:block ${
            isTransparent
              ? "absolute inset-x-0 top-0 bg-transparent"
              : isLight
                ? "relative w-full border-b border-[#E7E0D5] bg-white"
                : "relative w-full bg-[#1A1A1A]"
          }`}
        >
          <div
            className={`mx-auto flex max-w-[1440px] items-center justify-between ${
              isTransparent
                ? "px-[32px] pt-[28px]"
                : isLight
                  ? "px-[30px] py-[13px]"
                  : "px-[30px] py-[14px]"
            }`}
          >
            <Link to="/">
              <img
                src={logoSrc}
                alt="Nordic Table"
                className="h-[58px] w-auto"
              />
            </Link>

            <nav className="flex items-center gap-10">
              <NavLink to="/" className={getDesktopLinkClassName}>
                Forside
              </NavLink>

              <NavLink to="/menu" className={getDesktopLinkClassName}>
                Menu
              </NavLink>

              <NavLink to="/booking" className={getDesktopLinkClassName}>
                Bestil bord
              </NavLink>

              {isAdmin && (
                <NavLink to="/backoffice" className={getDesktopLinkClassName}>
                  Backoffice
                </NavLink>
              )}

              {!authUser ? (
                <NavLink to="/login" className={getDesktopLinkClassName}>
                  Log ind
                </NavLink>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`${desktopLinkBase} ${desktopLinkDefaultColor} ${desktopLinkHoverColor}`}
                >
                  Log ud
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        authUser={authUser}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
    </>
  );
}

export default SiteHeader;
