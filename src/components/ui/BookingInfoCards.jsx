import { FaUtensils, FaClock, FaPhoneAlt } from "react-icons/fa";

const cards = [
  {
    id: "size",
    icon: <FaUtensils className="text-[#916B1C]" />,
    title: "Bordstørrelse",
    text: "Vi tager imod selskaber fra 1 til 12 personer. Kontakt os direkte for større selskaber.",
  },
  {
    id: "hours",
    icon: <FaClock className="text-[#916B1C]" />,
    title: "Åbningstider",
    text: "Tirsdag-torsdag kl. 17-22. Fredag-lørdag kl. 17-23. Søndag kl. 12-20. Mandag lukket.",
  },
  {
    id: "contact",
    icon: <FaPhoneAlt className="text-[#916B1C]" />,
    title: "Kontakt",
    text: "Ring på +45 12 34 56 78 eller skriv til info@nordictable.dk ved spørgsmål.",
  },
];

function BookingInfoCards() {
  return (
    <div className="space-y-[10px] md:flex md:h-full md:flex-col md:justify-between md:space-y-0">
      {cards.map((card) => (
        <article
          key={card.id}
          className="rounded-[10px] border border-[#916B1C]/15 bg-[#F2EDE4] px-[12px] py-[12px] md:rounded-[8px] md:px-4 md:py-5"
        >
          <div className="flex items-start gap-[12px] md:gap-4">
            <div className="pt-[2px] text-[20px] md:pt-0 md:text-[22px]">
              {card.icon}
            </div>

            <div>
              <h3 className="font-cormorant text-[20px] font-light leading-[1.1] text-[#1A1A1A] md:text-[28px] md:leading-[40px]">
                {card.title}
              </h3>

              <p className="mt-[4px] max-w-[260px] text-[9px] font-light leading-[1.2] text-[#5F5F5F] md:mt-1 md:max-w-[360px] md:text-[14px] md:leading-[1.45]">
                {card.text}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default BookingInfoCards;
