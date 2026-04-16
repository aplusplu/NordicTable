import { useState } from "react";
import { toast } from "react-toastify";

function AdminDishMobileCard({ dish, onUpdate, onDelete, onToggleSignature }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    id: dish._id,
    title: dish.title || "",
    description: dish.description || "",
    category: dish.category || "",
    price: dish.price || "",
    isSignature: Boolean(dish.isSignature),
    image: null,
  });

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === "checkbox") {
      setEditData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    if (type === "file") {
      setEditData((prev) => ({
        ...prev,
        [name]: files?.[0] || null,
      }));
      return;
    }

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (
      !editData.title.trim() ||
      !editData.description.trim() ||
      !editData.category.trim() ||
      !editData.price
    ) {
      toast.error("Udfyld venligst alle obligatoriske felter.");
      return;
    }

    const result = await onUpdate(editData);

    if (result) {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Er du sikker på, at du vil slette "${dish.title}"?`,
    );

    if (!confirmed) return;

    await onDelete(dish._id);
  };

  const imageSrc = dish.image || "/dishes/no-image.jpg";

  return (
    <div className="mb-4 border border-[#CDB68A] p-4">
      <p className="font-semibold">{dish.title}</p>
      <p className="mt-2 text-[14px] text-[#5F5F5F]">{dish.description}</p>
      <p className="mt-2 text-[14px]">
        Kategori:{" "}
        {dish.category === "starter"
          ? "Forret"
          : dish.category === "main"
            ? "Hovedret"
            : dish.category === "dessert"
              ? "Dessert"
              : dish.category}
      </p>
      <p className="text-[14px]">Pris: {dish.price} kr.</p>
      <p className="text-[14px]">
        Signaturret: {String(Boolean(dish.isSignature))}
      </p>

      <img
        src={imageSrc}
        alt={dish.title}
        className="mt-3 h-[68px] w-[87px] object-cover"
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setIsEditing((prev) => !prev)}
          className="rounded bg-[#008000] px-3 py-2 text-white"
        >
          Rediger
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="rounded bg-[#FF0000] px-3 py-2 text-white"
        >
          Slet
        </button>

        <button
          type="button"
          onClick={() => onToggleSignature(dish._id)}
          className="rounded bg-[#916B1C] px-3 py-2 text-white"
        >
          Toggle signatur
        </button>
      </div>

      {isEditing && (
        <div className="mt-4 space-y-3 border-t pt-4">
          <input
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="h-[40px] w-full border px-3"
          />
          <input
            name="description"
            value={editData.description}
            onChange={handleChange}
            className="h-[40px] w-full border px-3"
          />
          <select
            name="category"
            value={editData.category}
            onChange={handleChange}
            className="h-[40px] w-full border px-3"
          >
            <option value="starter">Forret</option>
            <option value="main">Hovedret</option>
            <option value="dessert">Dessert</option>
          </select>
          <input
            name="price"
            type="number"
            value={editData.price}
            onChange={handleChange}
            className="h-[40px] w-full border px-3"
          />
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          <label className="flex items-center gap-2">
            <input
              name="isSignature"
              type="checkbox"
              checked={editData.isSignature}
              onChange={handleChange}
            />
            <span>Signatur</span>
          </label>

          <button
            type="button"
            onClick={handleSave}
            className="rounded bg-[#008000] px-4 py-2 text-white"
          >
            Gem ændringer
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminDishMobileCard;
