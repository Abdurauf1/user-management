import { Button } from "react-bootstrap";

interface Props {
  type: string;
  color: string;
  icon: string;
  onClick: () => void;
}

const ButtonComponent = ({ onClick, type, color, icon }: Props) => {
  const iconStyle = {
    fontSize: "18px",
    marginRight: "5px",
  };
  return (
    <Button onClick={onClick} variant={color}>
      <span style={iconStyle}>{icon}</span>
      <span>{type}</span>
    </Button>
  );
};

export default ButtonComponent;
