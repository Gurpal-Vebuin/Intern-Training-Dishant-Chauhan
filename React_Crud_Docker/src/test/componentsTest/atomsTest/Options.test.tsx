import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Options from "../../../components/atoms/options/Options";

describe("Options Component", () => {
  const mockOnChange = jest.fn();
  const languageOptions = {
    en: "English",
    hi: "Hindi",
    jpn: "Japanese",
  };

  //   Case-1
  test("Renders dropdown with given options", () => {
    render(
      <Options
        options={languageOptions}
        onChange={mockOnChange}
        selectedValue="en"
      />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Hindi")).toBeInTheDocument();
    expect(screen.getByText("Japanese")).toBeInTheDocument();
  });

  //   Case-2
  test("Displays correct selected value", () => {
    render(
      <Options
        options={languageOptions}
        onChange={mockOnChange}
        selectedValue="hi"
      />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("hi");
  });

  //   Case-3
  test("Calls onChange when a different option is selected", () => {
    render(
      <Options
        options={languageOptions}
        onChange={mockOnChange}
        selectedValue="en"
      />
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "jpn" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("jpn");
  });

  //   Case-4
  test("Handles empty options gracefully", () => {
    render(<Options options={{}} onChange={mockOnChange} selectedValue="" />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement.children.length).toBe(0);
  });
});
