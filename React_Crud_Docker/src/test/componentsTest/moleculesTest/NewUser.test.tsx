import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Links } from "../../../types/constants/Links/Links";
import NewUserForm from "../../../components/molecules/form/NewUserForm";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../../hooks/useLanguage", () => ({
  __esModule: true,
  default: jest.fn(() => ({ t: (key: string) => key })),
}));

jest.mock("react-hook-form", () => ({
  __esModule: true,
  useForm: jest.fn(),
}));

describe("NewUserForm Component", () => {
  const mockNavigate = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleSubmit: (fn: any) => fn,
      formState: { errors: {} },
      setValue: jest.fn(),
      trigger: jest.fn(),
      watch: jest.fn(() => "user"),
    });

    jest.clearAllMocks();
  });

  test("renders the form correctly", () => {
    render(<NewUserForm onSubmit={mockOnSubmit} />);

    expect(screen.getAllByText("Register").length).toBeGreaterThan(0);
    expect(screen.getByText("Form.Name")).toBeInTheDocument();
    expect(screen.getByText("Form.Email")).toBeInTheDocument();
    expect(screen.getByText("Form.Phone")).toBeInTheDocument();
    expect(screen.getByText("Form.Password")).toBeInTheDocument();
    expect(screen.getByText("Form.Roles")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Register/i })
    ).toBeInTheDocument();
  });

  test("calls onSubmit function when form is valid", async () => {
    render(<NewUserForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  test("navigates to home page when clicking login link", () => {
    render(<NewUserForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText("Login"));

    expect(mockNavigate).toHaveBeenCalledWith(Links.HOME);
  });

  test("Creates a snapshot for Register Form", () => {
    const { asFragment } = render(
      <NewUserForm onSubmit={mockOnSubmit}></NewUserForm>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
