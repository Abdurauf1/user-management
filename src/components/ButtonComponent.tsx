import { Button } from "react-bootstrap";
import { ReactNode } from "react";

interface Props {
  type: string;
  color: string;
  icon: ReactNode;
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
