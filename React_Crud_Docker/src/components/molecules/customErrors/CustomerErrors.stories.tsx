import { Meta, StoryFn } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CustomErrors from "./CustomErrors";

export default {
  title: "Components/CustomErrors",
  component: CustomErrors,
  tags: ["autodocs"],
} as Meta<typeof CustomErrors>;

const ErrorThrower: React.FC<{ error: Error }> = ({ error }) => {
  const [throwError, setThrowError] = useState(false);

  useEffect(() => {
    setThrowError(true);
  }, []);

  if (throwError) {
    throw error;
  }

  return <p>No error yet...</p>;
};

const Template: StoryFn<{ error: Error }> = (args) => (
  <ErrorBoundary FallbackComponent={CustomErrors}>
    <ErrorThrower error={args.error} />
  </ErrorBoundary>
);

export const DefaultError = Template.bind({});
DefaultError.args = {
  error: new Error("This is a sample error!"),
};
