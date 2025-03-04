import { Meta, StoryFn } from "@storybook/react";
import SelectLanguage from "./SelectLanguage";
import { Provider } from "react-redux";
import { store } from "../../../redux/store/Store";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../translation/i18config";

export default {
  title: "Components/SelectLanguage",
  component: SelectLanguage,
  tags: ["autodocs"],
} as Meta<typeof SelectLanguage>;

const Template: StoryFn = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <SelectLanguage />
    </I18nextProvider>
  </Provider>
);

export const SelectLanguageOption = Template.bind({});
