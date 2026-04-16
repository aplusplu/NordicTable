import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function BackofficeHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/");
  };

  const linkBase =
    "relative pb-[6px] text-[12px] font-semibold uppercase tracking-[0.04em] text-white transition-colors duration-150 hover:text-[#C0A062]";

  const getLinkClassName = ({ isActive }) =>
    `${linkBase} ${
      isActive
        ? "text-[#C0A062] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full after:bg-[#C0A062] after:content-['']"
        : ""
    }`;

  return (
    <header
      className="bg-[#1A1A1A] bg-cover bg-center"
      style={{ backgroundImage: "url('/media/assets/dish.png')" }}
    >
      <div className="mx-auto flex h-[90px] max-w-[1440px] items-center justify-between px-[30px] md:h-[96px]">
        <Link to="/">
          <img
            src="/media/logoWhite.png"
            alt="Nordic Table"
            className="h-[58px] w-auto cursor-pointer"
          />
        </Link>

        <nav className="flex items-center gap-10">
          <NavLink to="/backoffice" end className={getLinkClassName}>
            Retter
          </NavLink>

          <button type="button" onClick={handleLogout} className={linkBase}>
            Log ud
          </button>
        </nav>
      </div>
    </header>
  );
}

export default BackofficeHeader;
