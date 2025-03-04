import React from "react";
import { LanguageOptionsProps } from "../../../types/interfaces/interface";
import { SelectWrapper, StyledOption, StyledSelect } from "../../styles/select/SelectStyles";

const Options: React.FC<LanguageOptionsProps> = ({ options, onChange, selectedValue }) => {
  return (
    <SelectWrapper>
      <StyledSelect value={selectedValue} onChange={(e) => onChange(e.target.value)}>
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
