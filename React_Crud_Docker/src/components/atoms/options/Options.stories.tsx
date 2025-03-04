import { Meta, StoryFn } from "@storybook/react";
import  { useState } from "react";
import Options from "./Options";
import { LanguageOptionsProps } from "../../../types/interfaces/interface";

export default {
  title: "Components/Options",
  tags: ["autodocs"],
  component: Options,
  argTypes: {
    selectedValue: { control: "text" },
    onChange: { action: "changed" },
  },
} as Meta<typeof Options>;

const Template: StoryFn<LanguageOptionsProps> = (args) => {
  const [selectedLanguage, setSelectedLanguage] = useState(args.selectedValue);

  const handleLanguageChange = (newValue: string) => {
    setSelectedLanguage(newValue);
    args.onChange(newValue); 
  };

  return (
    <Options
      {...args}
      selectedValue={selectedLanguage} 
      onChange={handleLanguageChange} 
    />
  );
};

export const LanguageSelector = Template.bind({});
LanguageSelector.args = {
  selectedValue: "en",
  options: {
    en: "English",
    hi: "Hindi",
    jpn: "Japanese",
  },
};
