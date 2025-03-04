import { Meta, StoryFn } from "@storybook/react";
import NotFound from "./NotFound";

export default {
  title: "Components/NotFound",
  component: NotFound,
  tags: ["autodocs"],
} as Meta<typeof NotFound>;

const Template: StoryFn = () => (
    <NotFound />
);

export const NotFoundPage = Template.bind({});
