import { Meta, StoryFn } from "@storybook/react";
import AuthForm from "./AuthForm";
import { AuthFormProps } from "../../../types/interfaces/interface";
import { action } from "@storybook/addon-actions";
import { within, userEvent } from "@storybook/testing-library";
import { Provider } from "react-redux";
import { store } from "../../../redux/store/Store";
import Navbar from "../../organisms/navbar/Navbar";

export default {
  title: "Components/AuthForm",
  component: AuthForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Navbar />
        <Story />
      </>
    ),
  ],
} as Meta<typeof AuthForm>;

const Template: StoryFn<AuthFormProps> = (args) => (
  <Provider store={store}>
    <AuthForm {...args} />
  </Provider>
);
export const LoginForm = Template.bind({});

LoginForm.args = {
  onSubmit: action("Login Successful"),
};

export const withUserInteraction = Template.bind({});

withUserInteraction.args = {
  onSubmit: action("Login Attempted!"),
};

withUserInteraction.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const emailInput = canvas.getByPlaceholderText(/enter your email/i);
  await userEvent.type(emailInput, "testuser@example.com", { delay: 150 });

  const passwordInput = canvas.getByPlaceholderText(/enter your password/i);
  await userEvent.type(passwordInput, "Password@123", { delay: 150 });

  const loginButton = canvas.getByRole("button", { name: /Login/i });
  await userEvent.click(loginButton, { delay: 150 });
};

export const WithErrors = Template.bind({});

WithErrors.args = {
  onSubmit: action("Login Attempted"),
};

WithErrors.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button", { name: /login/i }));
};
