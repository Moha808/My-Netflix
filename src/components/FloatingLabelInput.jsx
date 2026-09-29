import React, { useState } from "react";

const FloatingLabelInput = ({ type, placeholder, value, onChange, id }) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full group">
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #333 inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
      <input
        type={type === "password" && showPassword ? "text" : type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="block w-full bg-[#333] text-white rounded px-4 pt-6 pb-2 focus:bg-[#454545] outline-none transition-colors duration-200 peer text-base border-none h-[56px]"
      />
      <label
        htmlFor={id}
        className="absolute left-4 text-[#8c8c8c] pointer-events-none transition-all duration-200 top-1/2 -translate-y-1/2 text-base peer-focus:top-3 peer-focus:scale-[0.85] peer-focus:-translate-y-0 peer-focus:text-[#8c8c8c] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:-translate-y-0 origin-[0]"
      >
        {placeholder}
      </label>
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8c8c8c] hover:text-white focus:outline-none"
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default FloatingLabelInput;
