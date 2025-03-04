import "@testing-library/react";
import "@testing-library/jest-dom";
import { InputValue } from "../../../components/atoms/input/InputValue";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Input Field Testing", () => {
  test("Renders Name Input Field", () => {
    render(
      <InputValue
        htmlFor="name"
        type="text"
        label="Name"
        id="name"
        placeholder="Enter your name"
      />
    );
    const inputElement = screen.getByPlaceholderText("Enter your name");
    expect(inputElement).toBeInTheDocument();
  });

  test("Displays error for invalid name input", () => {
    render(
      <>
        <InputValue
          htmlFor="name"
          type="text"
          label="Name"
          id="name"
          placeholder="Enter your name"
        />
        <p role="alert" id="name-error">
          Only letters allowed. | 文字のみ可。 | केवल अक्षर।
        </p>
      </>
    );

    const inputElement = screen.getByPlaceholderText("Enter your name");
    fireEvent.change(inputElement, { target: { value: "123John!" } });

    const errorMessage = screen.getByText(/Only letters allowed/);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Renders Email Input Field without Label", () => {
    render(
      <InputValue
        type="text"
        id="email"
        placeholder="Enter your email"
        aria-label="Email Address"
      />
    );
    const inputElement = screen.getByPlaceholderText("Enter your email");
    expect(inputElement).toBeInTheDocument();

    // Check that there is no visible label
    const labelElement = screen.queryByLabelText("Email Address");
    expect(labelElement).not.toBeInTheDocument();
  });

  test("Displays error for invalid email format", () => {
    render(
      <>
        <InputValue
          type="text"
          id="email"
          placeholder="Enter your email"
          aria-label="Email Address"
        />
        <p role="alert" id="email-error">
          Invalid email. | 無効なメール。 | अमान्य ईमेल।
        </p>
      </>
    );

    const inputElement = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(inputElement, { target: { value: "invalid-email" } });

    const errorMessage = screen.getByText(/Invalid email/);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Displays error for invalid phone number", () => {
    render(
      <>
        <InputValue
          htmlFor="phone"
          type="text"
          label="Phone"
          id="phone"
          placeholder="Enter your phone number"
        />
        <p role="alert" id="phone-error">
          10 digits only. | 10桁のみ。 | केवल 10 अंक।
        </p>
      </>
    );

    const inputElement = screen.getByPlaceholderText("Enter your phone number");
    fireEvent.change(inputElement, { target: { value: "12345" } });

    const errorMessage = screen.getByText(/10 digits only/);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Displays error for weak password", () => {
    render(
      <>
        <InputValue
          htmlFor="password"
          type="password"
          label="Password"
          id="password"
          placeholder="Enter your password"
        />
        <p role="alert" id="password-error">
          Min 8 chars. | 最低8文字。 | कम से कम 8 अक्षर।
        </p>
      </>
    );

    const inputElement = screen.getByPlaceholderText("Enter your password");
    fireEvent.change(inputElement, { target: { value: "12345" } });

    const errorMessage = screen.getByText(/Min 8 chars/);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Displays error for missing role selection", () => {
    render(
      <>
        <select id="roles" aria-label="Role">
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <p role="alert" id="role-error">
          Role required. | 役割が必要。 | भूमिका आवश्यक।
        </p>
      </>
    );

    const selectElement = screen.getByLabelText("Role");
    fireEvent.change(selectElement, { target: { value: "" } });

    const errorMessage = screen.getByText(/Role required/);
    expect(errorMessage).toBeInTheDocument();
  });
});
