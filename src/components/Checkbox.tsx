import { CheckboxType } from "../types";

const Checkbox = ({ id, onChange, name, type, isChecked }: CheckboxType) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={onChange}
      checked={isChecked}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Checkbox;
