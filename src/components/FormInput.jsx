const FormInput = ({
  label,
  name,
  type,
  defaultValue,
  size,
  value,
  handleChangeValue,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered ${size}`}
        placeholder="Search here..."
        value={value}
        onChange={(e) => {
          handleChangeValue("search", e.target.value);
        }}
      />
    </div>
  );
};
export default FormInput;
