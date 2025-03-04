import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { Links } from "../../../types/constants/Links/Links";
import AuthForm from "../../../components/molecules/form/AuthForm";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockNavigate = useNavigate as jest.Mock;

jest.mock("../../../hooks/useLanguage", () => ({
  __esModule: true,
  default: jest.fn(() => ({ t: (key: string) => key })),
}));

describe("AuthForm Component", () => {
  test("Navigates to Profile Page on Successful Submission", async () => {
    const mockOnSubmit = jest.fn(() => {
      mockNavigate(Links.PROFILE);
    });

    render(<AuthForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/form.email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/form.password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    expect(mockNavigate).toHaveBeenCalledWith(Links.PROFILE);
  });

  test("Shows validation errors when fields are empty", async () => {
    render(<AuthForm onSubmit={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText('"email" is not allowed to be empty')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('"password" is not allowed to be empty')
    ).toBeInTheDocument();
  });
});
