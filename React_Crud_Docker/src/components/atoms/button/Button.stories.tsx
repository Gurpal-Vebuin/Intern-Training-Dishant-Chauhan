import { Meta, StoryFn } from "@storybook/react";
import Button from "./Button";
import { ButtonPropsType } from "../../../types/interfaces/interface";

export default {
  title: "Components/Button",
  tags: ["autodocs"],
  component: Button,
  argTypes: {
    text: { control: "text" },
    isDisabled: { control: "boolean" },
    type: { control: "select", options: ["button", "submit", "reset"] },
    onClick: { action: "clicked" },
  },
} as Meta<typeof Button>;

const Template: StoryFn<ButtonPropsType> = (args) => <Button {...args} />;

export const Register = Template.bind({});
Register.args = {
  text: "Register",
  isDisabled: false,
};

export const Login = Template.bind({});
Login.args = {
  text: "Login",
  isDisabled: false,
};
