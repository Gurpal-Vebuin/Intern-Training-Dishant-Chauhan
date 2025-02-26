import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../../translation/i18config";
import { setLanguage } from "../../../redux/features/slices/LanguageSlice";
import { RootState } from "../../../types/interfaces/interface";
import Options from "../../atoms/options/Options";

const SelectLanguage: React.FC = () => {
  const languages = { en: "English", hi: "Hindi", jpn: "Japanese" };
  const dispatch = useDispatch();
  const currentLang = useSelector((state: RootState) => state.lang.language);

  const handleLanguageChange = (selectedLanguage: string) => {
    console.log(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    dispatch(setLanguage(selectedLanguage));
  };

  useEffect(() => {
    if (currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang]);

  return (
    <>
      <Options options={languages} selectedValue={currentLang} onChange={handleLanguageChange} />
    </>
  );
};

export default SelectLanguage;
