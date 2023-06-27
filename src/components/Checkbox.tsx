interface Props {
  id: string;
  onClick: () => void;
}

const Checkbox = ({ id, onClick }: Props) => {
  return <input onChange={onClick} id={id} type="checkbox" style={{ cursor: "pointer" }} />;
};

export default Checkbox;
