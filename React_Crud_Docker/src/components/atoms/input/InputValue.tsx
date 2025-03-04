import React from "react";
import { InputProps } from "../../../types/interfaces/interface";
import {
  InputWrapper,
  LabelWrapper,
  ValueWrapper,
} from "../../styles/form/InputStyles";

export const InputValue: React.FC<InputProps> = ({
  htmlFor,
  type,
  label,
  id,
  placeholder,
  registerProps,
}) => {
  return (
    <>
      <ValueWrapper>
        <LabelWrapper htmlFor={htmlFor}>{label}</LabelWrapper>
        <InputWrapper
          type={type}
          id={id}
          aria-label={label}
          placeholder={placeholder}
          {...registerProps}
        />
      </ValueWrapper>
    </>
  );
};
