import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useErrorBoundary } from "react-error-boundary";
import CustomErrors, { LogErrors } from "../../../components/molecules/customErrors/CustomErrors";

jest.mock("react-error-boundary", () => ({
  useErrorBoundary: jest.fn(),
}));

describe("CustomErrors Component", () => {
  const mockResetBoundary = jest.fn();

  beforeEach(() => {
    (useErrorBoundary as jest.Mock).mockReturnValue({
      resetBoundary: mockResetBoundary,
    });
  });

  it("renders the error message correctly", () => {
    const testError = new Error("Test error message");
    render(<CustomErrors error={testError} />);

    expect(screen.getByText("Something Went Wrong!")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("calls resetBoundary when the button is clicked", () => {
    const testError = new Error("Another test error");
    render(<CustomErrors error={testError} />);

    const button = screen.getByRole("button", { name: /try again/i });
    fireEvent.click(button);

    expect(mockResetBoundary).toHaveBeenCalledTimes(1);
  });
});

describe("LogErrors Function", () => {
  it("logs error details", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const testError = new Error("Logging error test");

    LogErrors(testError, { componentStack: "Test stack trace" });

    expect(consoleSpy).toHaveBeenCalledWith("Error: Logging error test");
    expect(consoleSpy).toHaveBeenCalledWith("Stack: Test stack trace");

    consoleSpy.mockRestore();
  });

  it("logs 'No stack available' if no component stack is provided", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const testError = new Error("Stackless error test");

    LogErrors(testError, { componentStack: "" });

    expect(consoleSpy).toHaveBeenCalledWith("Error: Stackless error test");
    expect(consoleSpy).toHaveBeenCalledWith("Stack: No stack available");

    consoleSpy.mockRestore();
  });
});
