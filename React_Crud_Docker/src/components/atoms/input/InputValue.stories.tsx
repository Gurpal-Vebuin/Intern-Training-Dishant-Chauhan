import { Meta, StoryFn } from "@storybook/react";
import { InputValue } from "./InputValue";
import { InputProps } from "../../../types/interfaces/interface";

export default {
  title: "Components/InputValue",
  tags: ["autodocs"],
  component: InputValue,
  argTypes: {
    label: { control: "text" },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "select"],
    },
    placeholder: { control: "text" },
    id: { control: "text" },
    htmlFor: { control: "text" },
    options: { control: "array" },
  },
} as Meta<typeof InputValue>;

const Template: StoryFn<InputProps> = (args) => <InputValue {...args} />;
export const Name = Template.bind({});
Name.args = {
  label: "Name",
  type: "text",
  id: "name",
  htmlFor: "name",
  placeholder: "Enter your name",
};

export const Email = Template.bind({});
Email.args = {
  label: "Email",
  type: "email",
  id: "email",
  htmlFor: "email",
  placeholder: "Enter your email",
};

export const Phone = Template.bind({});
Phone.args = {
  label: "Phone",
  type: "text",
  id: "phone",
  htmlFor: "phone",
  placeholder: "Enter your phone",
};

export const Password = Template.bind({});
Password.args = {
  label: "Password",
  type: "password",
  id: "password",
  htmlFor: "password",
  placeholder: "Enter your password",
};
