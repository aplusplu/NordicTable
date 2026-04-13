import SiteHeader from "../components/layout/SiteHeader";
import SiteFooter from "../components/layout/SiteFooter";

function Login() {
  return (
    <div className="min-h-screen bg-[#F9F6F1]">
      <SiteHeader light={false} />
      <main className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
        <h1 className="font-cormorant text-4xl text-[#1A1A1A]">Log ind</h1>
      </main>
      <SiteFooter />
    </div>
  );
}

export default Login;
