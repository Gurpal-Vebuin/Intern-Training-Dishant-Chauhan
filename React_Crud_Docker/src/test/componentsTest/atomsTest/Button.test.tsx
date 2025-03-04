import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../../../components/atoms/button/Button";

describe("Button Component", () => {
  test("Renders Button with text", () => {
    render(<Button text="Click Me" />);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  test("Handles click event", () => {
    const handleClick = jest.fn();
    render(<Button text="Submit" onClick={handleClick} />);

    const buttonElement = screen.getByText("Submit");
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("Renders Button as disabled", () => {
    render(<Button text="Disabled" isDisabled />);

    const buttonElement = screen.getByText("Disabled");
    expect(buttonElement).toBeDisabled();
  });

  test("Renders children instead of text", () => {
    render(
      <Button>
        <span>Custom Child</span>
      </Button>
    );

    const childElement = screen.getByText("Custom Child");
    expect(childElement).toBeInTheDocument();
  });

  test("Generating a Snapshot", () => {
    const { asFragment } = render(
      <Button>
        <span>Custom Child</span>
      </Button>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
