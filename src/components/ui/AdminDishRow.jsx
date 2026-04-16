import { useState } from "react";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";

function AdminDishRow({ dish, onUpdate, onDelete, onToggleSignature, isBusy }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
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
      const file = files?.[0] || null;

      setEditData((prev) => ({
        ...prev,
        [name]: file,
      }));

      setSelectedFileName(file ? file.name : "");
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
      setSelectedFileName("");
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
    <tr className="border-b border-[#CDB68A]">
      <td className="px-3 py-5 text-[14px] text-[#1A1A1A]">
        {isEditing ? (
          <input
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="w-[120px] border border-[#CFCFCF] px-2 py-1 outline-none"
          />
        ) : (
          dish.title
        )}
      </td>

      <td className="px-3 py-5 text-[14px] text-[#1A1A1A]">
        {isEditing ? (
          <input
            name="description"
            value={editData.description}
            onChange={handleChange}
            className="w-[180px] border border-[#CFCFCF] px-2 py-1 outline-none"
          />
        ) : (
          <span className="block max-w-[170px] leading-[1.15]">
            {dish.description}
          </span>
        )}
      </td>

      <td className="px-3 py-5 text-[14px] text-[#1A1A1A]">
        {isEditing ? (
          <select
            name="category"
            value={editData.category}
            onChange={handleChange}
            className="border border-[#CFCFCF] px-2 py-1 outline-none"
          >
            <option value="starter">Forret</option>
            <option value="main">Hovedret</option>
            <option value="dessert">Dessert</option>
          </select>
        ) : dish.category === "starter" ? (
          "Forret"
        ) : dish.category === "main" ? (
          "Hovedret"
        ) : dish.category === "dessert" ? (
          "Dessert"
        ) : (
          dish.category
        )}
      </td>

      <td className="px-3 py-5 text-[14px] text-[#1A1A1A]">
        {isEditing ? (
          <input
            name="price"
            type="number"
            value={editData.price}
            onChange={handleChange}
            className="w-[80px] border border-[#CFCFCF] px-2 py-1 outline-none"
          />
        ) : (
          dish.price
        )}
      </td>

      <td className="px-3 py-5">
        {isEditing ? (
          <label className="flex h-[36px] w-[126px] items-center justify-between border border-[#CFCFCF] px-[10px] text-[12px] text-[#6F6F6F]">
            <span className="truncate">{selectedFileName || "Fil"}</span>

            <input
              id={`edit-dish-image-${dish._id}`}
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />

            <label
              htmlFor={`edit-dish-image-${dish._id}`}
              className="cursor-pointer text-[18px] text-[#B8B8B8]"
            >
              📎
            </label>
          </label>
        ) : (
          <img
            src={imageSrc}
            alt={dish.title}
            className="h-[68px] w-[87px] object-cover"
          />
        )}
      </td>

      <td className="px-3 py-5 text-[14px] text-[#1A1A1A]">
        {isEditing ? (
          <input
            name="isSignature"
            type="checkbox"
            checked={editData.isSignature}
            onChange={handleChange}
            className="h-[20px] w-[20px]"
          />
        ) : (
          <button
            type="button"
            onClick={() => onToggleSignature(dish._id)}
            disabled={isBusy}
            className="text-[14px] text-[#1A1A1A] transition hover:text-[#916B1C]"
          >
            {String(Boolean(dish.isSignature))}
          </button>
        )}
      </td>

      <td className="px-3 py-5">
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                disabled={isBusy}
                className="rounded bg-[#008000] px-3 py-2 text-[12px] font-medium uppercase text-white"
              >
                Gem
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setSelectedFileName("");
                }}
                className="rounded bg-[#7A7A7A] px-3 py-2 text-[12px] font-medium uppercase text-white"
              >
                Annuller
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isBusy}
                className="text-[28px] text-[#FF0000]"
                aria-label="Slet ret"
              >
                <FaTrashAlt />
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                disabled={isBusy}
                className="text-[28px] text-[#008000]"
                aria-label="Rediger ret"
              >
                <FaRegEdit />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default AdminDishRow;
