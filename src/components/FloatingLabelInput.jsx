import React, { useState } from "react";

const FloatingLabelInput = ({ type, placeholder, value, onChange, id }) => {
  const [focused, setFocused] = useState(false);

  // Determine if the label should float (if focused or has value)
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative w-full group">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-[#333] text-white rounded px-5 pt-6 pb-2 focus:bg-[#454545] outline-none transition-colors duration-200 peer ${
          isFloating ? "text-base" : ""
        }`}
        style={{ height: "50px" }}
      />
      <label
        htmlFor={id}
        className={`absolute left-5 text-[#8c8c8c] transition-all duration-200 pointer-events-none origin-[0] ${
          isFloating
            ? "top-2.5 scale-75 -translate-y-0"
            : "top-1/2 -translate-y-1/2 scale-100"
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
