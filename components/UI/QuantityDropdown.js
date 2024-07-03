import { useState } from "react";

export default function QuantityDropdown({ maxQuantity = 10, onChange }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const selectedQuantity = parseInt(e.target.value, 10);
    setQuantity(selectedQuantity);
    onChange(selectedQuantity);
  };

  return (
    <div>
      <select
        value={quantity}
        onChange={handleQuantityChange}
        className="border-2 border-black py-2 px-3.5 focus:outline-none"
      >
        {[...Array(maxQuantity).keys()].map((index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
