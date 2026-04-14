function ButtonSmall({ children = "BOOK NU", onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex h-[29px] min-w-[80px] items-center justify-center border border-black/35 bg-[#916B1C] px-[11px] py-[6px] text-[11px] font-medium uppercase tracking-wide text-white shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition hover:brightness-110"
    >
      {children}
    </button>
  );
}

export default ButtonSmall;
