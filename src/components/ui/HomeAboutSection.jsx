function HomeAboutSection({ menuCount = 13 }) {
  return (
    <section className="bg-[#F2EDE5] md:px-[40px] md:py-[40px]">
      <div className="mx-auto grid max-w-[1440px] gap-0 md:grid-cols-[1fr_1fr] md:gap-[44px]">
        <div>
          <img
            src="/media/assets/restaurant.png"
            alt="Restaurant Nordic Table"
            className="h-[296px] w-full object-cover md:h-full md:min-h-[646px]"
          />
        </div>

        <div className="px-[24px] py-[28px] md:px-0 md:py-[18px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#916B1C] md:text-[24px] md:tracking-[0.12em]">
            Om os
          </p>

          <h2 className="mt-[18px] max-w-[350px] font-cormorant text-[32px] font-light leading-[1.15] text-[#1A1A1A] md:mt-[26px] md:max-w-[620px] md:text-[64px]">
            En restaurant båret af
            <br />
            nærhed og nærvær
          </h2>

          <div className="mt-[18px] h-[1px] w-[53px] bg-[#B39659] md:mt-[28px] md:w-[80px]" />

          <p className="mt-[20px] max-w-[350px] text-[13px] leading-[1.9] text-[#5F5F5F] md:mt-[42px] md:max-w-[560px] md:text-[18px] md:leading-[1.8]">
            Nordic Table er grundlagt med en klar overbevisning: god mad behøver
            ikke at være kompliceret. Vi laver mad af det, naturen giver os -
            det nordiske køkkens uforlignelige råvarer.
          </p>

          <p className="mt-[20px] max-w-[350px] text-[13px] leading-[1.9] text-[#5F5F5F] md:mt-[32px] md:max-w-[560px] md:text-[18px] md:leading-[1.8]">
            Fra de friske fiskefarvande til skovens bær og urter - vores menu
            forandrer sig med årstidens rytme. Det giver gæsterne noget nyt at
            opdage, og det giver os glæden ved at lave mad med det bedste, vi
            kan få fat i.
          </p>

          <div className="mt-[28px] border-t border-[#D8CBAF] pt-[18px] md:mt-[42px] md:pt-[24px]">
            <div className="grid grid-cols-3 gap-[10px] text-center">
              <div>
                <p className="font-cormorant text-[50px] leading-[1] text-[#B39659] md:text-[62px]">
                  {menuCount}
                </p>
                <p className="mt-[4px] text-[11px] uppercase tracking-[0.05em] text-[#B39659] md:text-[18px]">
                  Retter på menuen
                </p>
              </div>

              <div>
                <p className="font-cormorant text-[50px] leading-[1] text-[#B39659] md:text-[62px]">
                  6
                </p>
                <p className="mt-[4px] text-[11px] uppercase tracking-[0.05em] text-[#B39659] md:text-[18px]">
                  Års erfaring
                </p>
              </div>

              <div>
                <p className="font-cormorant text-[50px] leading-[1] text-[#B39659] md:text-[62px]">
                  100
                </p>
                <p className="mt-[4px] text-[11px] uppercase tracking-[0.05em] text-[#B39659] md:text-[18px]">
                  % nordiske råvarer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeAboutSection;
