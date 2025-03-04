import React from "react";
import { LanguageOptionsProps } from "../../../types/interfaces/interface";
import {
  SelectWrapper,
  StyledOption,
  StyledSelect,
} from "../../styles/select/SelectStyles";

const Options: React.FC<LanguageOptionsProps> = ({
  options,
  onChange,
  selectedValue,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    if (newValue !== selectedValue) {
      onChange(newValue);
    }
  };

  return (
    <SelectWrapper>
      <StyledSelect value={selectedValue} onChange={handleChange}>
        {Object.entries(options).map(([key, value]) => (
          <StyledOption key={key} value={key}>
            {value}
          </StyledOption>
        ))}
      </StyledSelect>
    </SelectWrapper>
  );
};

export default Options;
