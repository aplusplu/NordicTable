import { Link } from "react-router-dom";

// Small helper kept inside the component file so the section stays self-contained.
function formatCategory(category) {
  if (category === "starter") return "Forret"; //  checks if the category of the dish is "starter". If it is, we return the string "Forret", this function is used to convert the category value from the backend to a more user-friendly format in Danish for display purposes on the frontend.
  if (category === "main") return "Hovedret";
  if (category === "dessert") return "Dessert";
  return "Ret";
}

function formatPrice(price) {
  const numericPrice = Number(price); //numericPrice is a variable that holds the numeric value of the price string. The Number() function is used to convert the price string to a number, which is then assigned to the numericPrice variable. This allows us to check if the conversion was successful (i.e., if the price string was a valid number) and format it accordingly. If the conversion results in NaN (Not a Number), we can handle that case separately, ensuring that we still display the price in a user-friendly way even if the input is not a valid number.

  if (Number.isNaN(numericPrice)) {
    return `${price} kr.`;
  }

  return `${numericPrice} kr.`; // if the conversion is successful, we return a formatted string that includes the numeric price followed by " kr.",this function ensures that the price is displayed in a consistent and user-friendly format on the frontend, regardless of whether the input was a valid number or not.
}

function HomeSignatureSection({
  dishes = [],
  isLoading = false,
  errorMessage = "", //errormessage is a string that holds any error message related to fetching the signature dishes. If there was an error during the data fetching process, this variable will contain the error message that can be displayed to the user. If there were no errors, it will be an empty string. This allows the component to conditionally render an error message if something went wrong while trying to retrieve the signature dishes from the backend.
}) {
  return (
    <section
      id="signaturretter"
      className="bg-[#F9F6F1] px-[23px] py-[36px] md:px-[30px] md:py-[40px]"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#916B1C] md:text-[14px]">
            Udvalgte retter
          </p>

          <h2 className="mt-[18px] font-cormorant text-[32px] font-light leading-[1] text-[#1A1A1A] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:mt-[34px] md:text-[64px]">
            Vores signaturretter
          </h2>

          <p className="mx-auto mt-[22px] max-w-[690px] text-[14px] leading-[1.55] text-[#916B1C] md:mt-[26px] md:text-[22px] md:leading-[1.15]">
            Hver af vores signaturretter er omhyggeligt sammensat af sæsonens
            bedste nordiske råvarer.
          </p>
        </div>

        {isLoading && (
          <div className="mt-10 rounded-md border border-[#D7C7A7] bg-white px-5 py-6 text-sm text-[#5F5F5F]">
            Henter signaturretter...
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="mt-10 rounded-md border border-red-200 bg-red-50 px-5 py-6 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {!isLoading && !errorMessage && (
          <>
            <div className="mt-[34px] grid gap-[18px] md:mt-[62px] md:grid-cols-3 md:gap-[20px]">
              {dishes.map((dish) => (
                <article
                  key={dish._id}
                  className="overflow-hidden border border-black/5 bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                >
                  <div className="relative">
                    <img
                      src={dish.image}
                      alt={dish.title}
                      className="h-[188px] w-full object-cover md:h-[188px]"
                    />

                    <span className="absolute right-[12px] top-[12px] bg-[#916B1C] px-[11px] py-[5px] text-[10px] font-medium uppercase tracking-[0.08em] text-white md:text-[12px]">
                      Signatur
                    </span>
                  </div>

                  <div className="bg-white px-[14px] pb-[16px] pt-[14px] md:px-[10px] md:pb-[10px] md:pt-[10px]">
                    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#7C632F] md:text-[12px]">
                      {formatCategory(dish.category)}
                    </p>

                    <h3 className="mt-[8px] font-cormorant text-[19px] font-light leading-[1] text-[#1A1A1A] md:text-[32px] md:drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                      {dish.title}
                    </h3>

                    <p className="mt-[10px] text-[11px] font-light leading-[1.5] text-[#5F5F5F]">
                      {dish.description}
                    </p>

                    <p className="mt-[12px] font-cormorant text-[16px] font-light leading-[1.2] text-[#1A1A1A]">
                      {formatPrice(dish.price)}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-[24px] flex justify-center md:mt-[40px]">
              <Link
                to="/menu"
                className="inline-flex h-[39px] items-center justify-center border border-black/35 bg-transparent px-[24px] text-[12px] font-medium uppercase text-[#1A1A1A] shadow-[0_3px_4px_rgba(0,0,0,0.15)] transition hover:bg-black/5 md:h-[67px] md:min-w-[350px] md:px-[34px] md:text-[18px]"
              >
                Se hele menuen
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default HomeSignatureSection;
