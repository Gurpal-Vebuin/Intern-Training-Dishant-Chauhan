import styled from "styled-components";

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSelect = styled.select`
  width: 200px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid rgb(9, 45, 70);
  border-radius: 8px;
  background-color: #f8f9fa;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
  }
`;

export const StyledOption = styled.option`
  font-size: 16px;
  padding: 5px;
  background-color: #fff;
`;
