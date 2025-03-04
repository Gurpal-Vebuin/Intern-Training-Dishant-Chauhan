import React from "react";
import { ButtonPropsType } from "../../../types/interfaces/interface";
import { RegisterButton } from "../../styles/navbar/NavbarStyles";

const Button: React.FC<ButtonPropsType> = ({
  type = "button",
  text,
  onClick,
  isDisabled = false,
  children,
}) => {
  return (
    <>
      <RegisterButton type={type} onClick={onClick} disabled={isDisabled}>
        {children || text}
      </RegisterButton>
    </>
  );
};

export default Button;
