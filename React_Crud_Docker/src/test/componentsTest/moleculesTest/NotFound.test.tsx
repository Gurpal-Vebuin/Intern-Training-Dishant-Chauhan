import "@testing-library/jest-dom"; // ✅ Import this for matchers
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Links } from "../../../types/constants/Links/Links";
import NotFound from "../../../components/molecules/notfound/NotFound";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("NotFound Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("renders 404 message and description", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByText("Oops! The page you are looking for does not exist.")
    ).toBeInTheDocument();
  });

  it("navigates to home page when button is clicked", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /go to home/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(Links.HOME);
  });
});
