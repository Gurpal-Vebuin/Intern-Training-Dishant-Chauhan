import React from "react";
import { useErrorBoundary } from "react-error-boundary";
import {
  ContentWrapper,
  RegisterButton,
} from "../../styles/navbar/NavbarStyles";

export const logErrors = (error: Error, info: React.ErrorInfo) => {
  console.log(`Error: ${error.message}`);
  console.log(`Stack: ${info.componentStack || "No stack available"}`);
};

const CustomErrors: React.FC<{ error: Error }> = ({ error }) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <ContentWrapper>
      <h2>Something Went Wrong!</h2>
      <p>{error.message}</p>
      <RegisterButton onClick={resetBoundary}>Try Again</RegisterButton>
    </ContentWrapper>
  );
};

export default CustomErrors;
