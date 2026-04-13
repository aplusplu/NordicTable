import { motion } from "framer-motion";

function PageHero({
  eyebrow,
  title,
  text,
  image = "/media/assets/headerbg.png",
  height = "min-h-[220px] md:min-h-[320px]",
}) {
  return (
    <section className={`relative overflow-hidden ${height}`}>
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto flex h-full max-w-[1440px] items-end px-4 pb-10 pt-24 md:px-8 md:pb-14 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-[620px]"
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#C0A062] md:text-sm">
            {eyebrow}
          </p>

          <h1 className="font-cormorant text-[40px] leading-none text-white md:text-[56px]">
            {title}
          </h1>

          {text && (
            <p className="mt-4 max-w-[520px] text-sm leading-7 text-white/85 md:text-base">
              {text}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default PageHero;
