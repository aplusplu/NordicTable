function DishRow({ dish }) {
  return (
    <article className="border-b border-[#D7C7A7] py-4 md:py-5">
      <div className="flex items-start gap-3 md:gap-4">
        <img
          src={dish.image}
          alt={dish.title}
          className="h-[52px] w-[52px] shrink-0 rounded-sm object-cover md:h-[60px] md:w-[60px]"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-cormorant text-[22px] leading-none text-[#1A1A1A] md:text-[28px]">
              {dish.title}
            </h3>

            <p className="shrink-0 text-sm font-medium text-[#7C632F] md:text-base">
              {dish.price},-
            </p>
          </div>

          <p className="mt-2 max-w-[900px] text-xs leading-6 text-[#5F5F5F] md:text-sm">
            {dish.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default DishRow;
