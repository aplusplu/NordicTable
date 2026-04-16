import { useState } from "react";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa6";

const initialForm = {
  title: "",
  description: "",
  category: "",
  price: "",
  image: null,
};

function AdminDishCreateForm({ onCreate, isBusy }) {
  const [formData, setFormData] = useState(initialForm);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      const file = files?.[0] || null;

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      setSelectedFileName(file ? file.name : "");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.category.trim() ||
      !formData.price
    ) {
      toast.error("Udfyld venligst alle obligatoriske felter.");
      return;
    }

    const result = await onCreate(formData);

    if (result) {
      setFormData(initialForm);
      setSelectedFileName("");
      event.target.reset();
    }
  };

  return (
    <section className="text-center">
      <h2 className="font-cormorant text-[30px] font-light text-[#1A1A1A] md:text-[44px]">
        Opret ny ret til menukortet
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-[24px] w-full max-w-[1060px] border border-[#916B1C] border-t-0 px-[16px] py-[16px] md:mt-[34px] md:flex md:min-h-[80px] md:items-center md:gap-[18px] md:px-[16px]"
      >
        <input
          name="title"
          type="text"
          placeholder="Titel"
          onChange={handleChange}
          className="mb-3 h-[40px] w-full border border-[#CFCFCF] px-[12px] text-[14px] text-[#1A1A1A] outline-none placeholder:text-[#9A9A9A] md:mb-0 md:w-[160px]"
        />

        <input
          name="description"
          type="text"
          placeholder="Beskrivelse"
          onChange={handleChange}
          className="mb-3 h-[40px] w-full border border-[#CFCFCF] px-[12px] text-[14px] text-[#1A1A1A] outline-none placeholder:text-[#9A9A9A] md:mb-0 md:w-[240px]"
        />

        <select
          name="category"
          defaultValue=""
          onChange={handleChange}
          className="mb-3 h-[40px] w-full border border-[#CFCFCF] px-[12px] text-[14px] text-[#1A1A1A] outline-none md:mb-0 md:w-[160px]"
        >
          <option value="" disabled>
            Type
          </option>
          <option value="starter">Forret</option>
          <option value="main">Hovedret</option>
          <option value="dessert">Dessert</option>
        </select>

        <input
          name="price"
          type="number"
          placeholder="Pris"
          onChange={handleChange}
          className="mb-3 h-[40px] w-full border border-[#CFCFCF] px-[12px] text-[14px] text-[#1A1A1A] outline-none placeholder:text-[#9A9A9A] md:mb-0 md:w-[120px]"
        />

        <label className="mb-3 flex h-[40px] w-full items-center justify-between border border-[#CFCFCF] px-[12px] text-[14px] text-[#8A8A8A] md:mb-0 md:w-[160px]">
          <span className="truncate">{selectedFileName || "Fil"}</span>

          <input
            id="create-dish-image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />

          <label
            htmlFor="create-dish-image"
            className="cursor-pointer text-[18px] text-[#8A8A8A]"
          >
            📎
          </label>
        </label>

        <button
          type="submit"
          disabled={isBusy}
          className="flex h-[40px] w-[56px] items-center justify-center rounded-[3px] bg-[#008000] text-[22px] text-white transition hover:bg-[#006f00] disabled:opacity-60"
          aria-label="Opret ret"
        >
          <FaPlus />
        </button>
      </form>
    </section>
  );
}

export default AdminDishCreateForm;
