import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import SiteHeader from "../components/layout/SiteHeader";
import SiteFooter from "../components/layout/SiteFooter";
import LoginForm from "../components/ui/LoginForm";

function Login() {
  return (
    <div className="min-h-screen bg-[#F9F6F1]">
      <SiteHeader variant="light" /> {/* The SiteHeader component is included at the top of the page with a "light" variant, which likely affects its styling (e.g., colors). This provides consistent navigation and branding across the site. */}

      <main className="relative z-10 mx-auto max-w-[1440px] px-[20px] pb-[40px] pt-[74px] md:px-[100px] md:py-[52px]">
        <div className="mx-auto max-w-[374px] md:ml-[180px]">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-[13px] text-[#5F5F5F] transition hover:text-[#1A1A1A]"
          >
            <FaArrowLeft className="text-[12px]" />
            Tilbage til forsiden
          </Link>

          <h1 className="mt-[28px] font-cormorant text-[38px] font-light leading-none text-[#1A1A1A] md:text-[64px]">
            Log ind
          </h1>

          <p className="mt-[14px] text-[16px] text-[#3F3F3F]">
            Adgang forbeholdt personale og administratorer
          </p>

          <LoginForm />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default Login;
