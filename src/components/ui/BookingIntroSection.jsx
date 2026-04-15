import BookingInfoCards from "./BookingInfoCards";
import BookingForm from "./BookingForm";

function BookingIntroSection() {
  return (
    <section className="bg-[#F9F6F1] px-[20px] py-[20px] md:px-[120px] md:py-[72px]">
      <div className="mx-auto max-w-[1440px] md:grid md:grid-cols-[1fr_340px] md:items-stretch md:gap-5 lg:grid-cols-[1fr_1.02fr]">
        <div className="flex h-full flex-col">
          <div className="mb-[14px] md:mb-8">
            <p className="text-[7px] font-medium uppercase tracking-[0.2em] text-[#7C632F] md:text-[15px] md:tracking-[0.18em]">
              GÆSTFRIHED
            </p>

            <h2 className="mt-[10px] font-cormorant text-[17px] font-light leading-none text-[#1A1A1A] md:mt-3 md:text-[52px] md:leading-none">
              Velkomst fra højre ben
            </h2>

            <div className="mt-[10px] h-[1px] w-[52px] bg-[#CDB68A] md:mt-4 md:w-[67px]" />

            <p className="mt-[10px] max-w-[228px] text-[9px] font-light leading-none text-[#5F5F5F] md:mt-4 md:max-w-[520px] md:text-[14px] md:leading-[1.45]">
              Vi ønsker at give dig og dine gæster den bedst mulige oplevelse.
              Her er hvad du skal vide inden dit besøg.
            </p>
          </div>

          <div className="flex-1">
            <BookingInfoCards />
          </div>
        </div>

        <div className="mt-[22px] flex h-full flex-col md:mt-0">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}

export default BookingIntroSection;
