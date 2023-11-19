import { Button } from "react-bootstrap";
import { ButtonComponentType } from "../types";

const ButtonComponent = ({ onClick, type, color, icon }: ButtonComponentType) => {
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
