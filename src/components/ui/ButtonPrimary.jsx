function ButtonPrimary({
  children = "BOOK BORD",
  onClick,
  type = "button",
  fullWidth = true,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex h-[52px] items-center justify-center border border-black/35 bg-[#916B1C] px-6 text-[14px] font-medium uppercase tracking-wide text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:brightness-110 md:h-[92px] md:text-[22px] ${
        fullWidth ? "w-full" : "w-auto"
      }`}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
