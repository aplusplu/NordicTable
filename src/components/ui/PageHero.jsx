import { motion } from "framer-motion";

function PageHero({
  eyebrow,
  title,
  text,
  image = "/media/assets/headerbg.png",
  height,
  variant = "default",
}) {
  const isHome = variant === "home";

  return (
    <section
      className={`relative overflow-hidden ${
        height || (isHome ? "h-[527px] md:h-[820px]" : "h-[258px] md:h-[420px]")
      }`}
    >
      <img
        src={image}
        alt={typeof title === "string" ? title : "Nordic Table"}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/58" />

      {isHome ? (
        <div className="relative z-10 mx-auto h-full max-w-[1440px] px-[20px] pt-[126px] md:px-[52px] md:pt-[170px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-[330px] md:max-w-[610px]"
          >
            <div className="mb-[18px] flex items-center gap-[12px] md:mb-[22px] md:gap-[18px]">
              <span className="block h-[1px] w-[48px] bg-[#C0A062] md:w-[64px]" />
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#C0A062] md:text-[24px] md:tracking-[0.14em]">
                {eyebrow}
              </p>
            </div>

            <h1 className="font-cormorant text-[32px] font-light leading-[0.94] text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:text-[72px]">
              {title}
            </h1>

            {text && (
              <div className="mt-[18px] max-w-[330px] text-[13px] leading-[1.7] text-white md:mt-[26px] md:max-w-[760px] md:text-[18px] md:leading-[1.6]">
                {text}
              </div>
            )}
          </motion.div>
        </div>
      ) : (
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-[20px] md:px-[52px] lg:px-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-[780px]"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#C0A062] md:text-[14px]">
              {eyebrow}
            </p>

            <h1 className="mt-4 font-cormorant text-[32px] font-light leading-[0.95] text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:text-[52px] lg:text-[64px]">
              {title}
            </h1>

            {text && (
              <div className="mt-4 max-w-[680px] text-[13px] leading-7 text-white/90 md:text-[18px] md:leading-[1.6]">
                {text}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default PageHero;
