import styled from "styled-components";

export const LabelWrapper = styled.label`
  font-size: 18px;
  font-weight: bold;
  color: rgb(10, 34, 63);
  margin-bottom: 5px;
  text-align: left;
`;

export const  InputWrapper = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  outline: none;
  background: rgba(255, 255, 255, 0.6);
  color: #333;
  transition: all 0.3s ease-in-out;

  &::placeholder {
    color: #777;
  }

  &:focus {
    background: rgba(255, 255, 255, 1);
    border-color: #007bff;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.4);
  }
`;

export const ValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
