import { Meta, StoryFn } from "@storybook/react";
import NewUserForm from "./NewUserForm";
import { NewFormProps } from "../../../types/interfaces/interface";
import { action } from "@storybook/addon-actions";
import { within, userEvent } from "@storybook/testing-library";
import Navbar from "../../organisms/navbar/Navbar";

export default {
  title: "Components/NewUserForm",
  component: NewUserForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Navbar />
        <Story />
      </>
    ),
  ],
} as Meta<typeof NewUserForm>;

const Template: StoryFn<NewFormProps> = (args) => <NewUserForm {...args} />;

export const RegisterForm = Template.bind({});
RegisterForm.args = {
  onSubmit: action("Register Successful"),
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  onSubmit: action("Register Attempted"),
};

WithErrors.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const nameInput = await canvas.getByPlaceholderText(/enter your name/i);
  await userEvent.type(nameInput, "John Doe", { delay: 100 });

  const emailInput = await canvas.getByPlaceholderText(/enter your email/i);
  await userEvent.type(emailInput, "johndoe@example.com", { delay: 100 });

  const phoneInput = await canvas.getByPlaceholderText(/enter your phone/i);
  await userEvent.type(phoneInput, "9876543210", { delay: 100 });

  const passwordInput = await canvas.getByPlaceholderText(
    /enter your password/i
  );
  await userEvent.type(passwordInput, "pass", { delay: 100 });

  const registerButton = await canvas.getByRole("button", {
    name: /register/i,
  });
  await userEvent.click(registerButton);

};

export const WithUserInteraction = Template.bind({});
WithUserInteraction.args = {
  onSubmit: action("Registration Attempted!"),
};

WithUserInteraction.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const nameInput = await canvas.getByPlaceholderText(/enter your name/i);
  await userEvent.type(nameInput, "Alice Doe", { delay: 100 });

  const emailInput = await canvas.getByPlaceholderText(/enter your email/i);
  await userEvent.type(emailInput, "alice@example.com", { delay: 100 });

  const phoneInput = await canvas.getByPlaceholderText(/enter your phone/i);
  await userEvent.type(phoneInput, "9988776655", { delay: 100 });

  const passwordInput = await canvas.getByPlaceholderText(
    /enter your password/i
  );
  await userEvent.type(passwordInput, "SecurePassword123!", { delay: 100 });

  const registerButton = await canvas.getByRole("button", {
    name: /register/i,
  });
  await userEvent.click(registerButton);

};
