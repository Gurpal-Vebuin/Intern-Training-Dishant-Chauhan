import { Meta, StoryFn } from "@storybook/react";
import Profile from "./Profile";
import Navbar from "../navbar/Navbar";

export default {
  title: "Components/Profile",
  component: Profile,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <>
        <Navbar />
        <Story />
      </>
    ),
  ],
} as Meta<typeof Profile>;

const Template: StoryFn = (args) => <Profile {...args} />;

export const Default = Template.bind({});
Default.args = {};
