function BackofficeSectionHeader() {
  return (
    <section className="bg-[#F7F5F2] px-[20px] py-[22px] text-center md:px-[30px] md:py-[26px]">
      <p className="text-[18px] uppercase tracking-[0.18em] text-[#1A1A1A] md:text-[26px] md:tracking-[0.14em]">
        Backoffice
      </p>

      <div className="mx-auto mt-[12px] h-[1px] max-w-[1040px] bg-[#916B1C]" />

      <h1 className="mt-[14px] font-cormorant text-[42px] font-light leading-none text-[#1A1A1A] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:text-[64px]">
        Retter
      </h1>
    </section>
  );
}

export default BackofficeSectionHeader;
