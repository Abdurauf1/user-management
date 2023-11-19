import { CheckboxType } from "../types";

const Checkbox = ({ id, onClick }: CheckboxType) => {
  return <input onChange={onClick} id={id} type="checkbox" style={{ cursor: "pointer" }} />;
};

export default Checkbox;
