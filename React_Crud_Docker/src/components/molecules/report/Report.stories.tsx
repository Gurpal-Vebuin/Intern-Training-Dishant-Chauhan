import { Meta, StoryFn } from "@storybook/react";
import Report from "./Report";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../translation/i18config";
import { Provider } from "react-redux";
import { store } from "../../../redux/store/Store";
import Navbar from "../../organisms/navbar/Navbar";
export default {
  title: "Components/Report",
  component: Report,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Navbar />
        <Story />
      </>
    ),
  ],
} as Meta<typeof Report>;

const Template: StoryFn = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <Report />
    </I18nextProvider>
  </Provider>
);

export const ReportPage = Template.bind({});
