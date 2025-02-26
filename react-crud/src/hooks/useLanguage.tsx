import { useEffect } from "react";
import { useSelector } from "react-redux";
import i18n from "../translation/i18config";
import { RootState } from "../types/interfaces/interface";

const useLanguage = () => {
  const currentLang = useSelector((state: RootState) => state.lang.language);

  useEffect(() => {
    if (currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang]); 

  return { t: i18n.t, currentLang }; 
};

export default useLanguage;
