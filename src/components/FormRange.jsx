import { useState } from "react";
const FormRange = ({ label, name, size, value, handleChangeValue }) => {
  const step = 10;
  const maxPrice = 2000;

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>${value}</span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        value={value}
        onChange={(e) => handleChangeValue("price", e.target.value)}
        className={`range range-primary ${size}`}
        step={step}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md">$0</span>
        <span className="font-bold text-md">Max : ${maxPrice}</span>
      </div>
    </div>
  );
};
export default FormRange;
