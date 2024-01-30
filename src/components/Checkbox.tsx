import { CheckboxType } from "../types";

const Checkbox = ({ id, onChange }: CheckboxType) => {
  return <input onChange={onChange} id={id} type="checkbox" style={{ cursor: "pointer" }} />;
};

export default Checkbox;
