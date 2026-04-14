function DishRow({ dish }) {
  return (
    <article className="py-4 md:py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3 md:gap-4">
          {dish.image && (
            <img
              src={dish.image}
              alt={dish.title}
              className="hidden h-[60px] w-[80px] shrink-0 object-cover md:block"
            />
          )}

          <div className="min-w-0 flex-1">
            <h3
              className="font-cormorant font-light leading-none text-[#1A1A1A]
              text-[20px] md:text-[28px]
              md:drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            >
              {dish.title}
            </h3>

            <p className="mt-2 text-[12px] leading-6 text-[#1A1A1A]/75 md:text-[16px] md:leading-[1.45]">
              {dish.description}
            </p>
          </div>
        </div>

        <p className="shrink-0 font-cormorant text-[18px] leading-none text-[#1A1A1A] md:text-[20px]">
          {dish.price} kr.
        </p>
      </div>

      {/* thin separator for dishes */}
      <div className="mt-4 h-[0.5px] w-full bg-[#DCD4C8]" />
    </article>
  );
}

export default DishRow;
