import { Link } from "react-router-dom";

function HomeReservationSection() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/media/assets/restaurant2.png"
        alt="Book dit bord hos Nordic Table"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/72" />

      <div className="relative mx-auto max-w-[1440px] px-[20px] py-[58px] text-center md:px-[30px] md:py-[84px]">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B39659] md:text-[24px] md:tracking-[0.12em]">
          Reservationer
        </p>

        <h2 className="mx-auto mt-[18px] max-w-[350px] font-cormorant text-[32px] font-light leading-[1.1] text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:mt-[26px] md:max-w-[960px] md:text-[64px]">
          Book dit bord hos Nordic Table
        </h2>

        <p className="mx-auto mt-[18px] max-w-[292px] text-[11px] font-light leading-[1.35] text-white md:mt-[22px] md:max-w-[860px] md:text-[22px] md:leading-[1.45]">
          Vi åbner vores døre for dig og dine, og giver jer en aften I aldrig
          glemmer. Book dit bord i dag - det er nemt og hurtigt.
        </p>

        <div className="mt-[22px] md:mt-[28px]">
          <Link
            to="/booking"
            className="inline-flex h-[39px] items-center justify-center border border-[#916B1C] bg-[#916B1C] px-[18px] text-[12px] font-medium uppercase text-white shadow-[0_3px_4px_rgba(0,0,0,0.15)] transition hover:bg-[#7f5d16] md:h-[92px] md:min-w-[350px] md:px-[36px] md:text-[18px]"
          >
            Book bord nu
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeReservationSection;
