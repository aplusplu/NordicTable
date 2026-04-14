function SectionHeading({ title, image }) {
  return (
    <div className="mt-10 md:mt-16">
      <div className="flex items-center gap-4 md:gap-6">
        {image && (
          <img
            src={image}
            alt=""
            className="h-[52px] w-[72px] object-cover md:h-[60px] md:w-[80px]"
          />
        )}

        <h2
          className="font-cormorant font-light leading-none text-[#1A1A1A]
          text-[28px] md:text-[40px] lg:text-[48px]
          md:drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        >
          {title}
        </h2>
      </div>

      <div className="mt-3 h-[1px] w-full bg-[#916B1C] md:mt-5" />
    </div>
  );
}

export default SectionHeading;
