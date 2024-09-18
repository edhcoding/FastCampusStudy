import { languageState } from "components/atom";
import TRANSLATIONS from "components/constants/language";
import { useRecoilValue } from "recoil";

export default function useTranslation() {
  const lang = useRecoilValue(languageState);

  return (key: keyof typeof TRANSLATIONS) => {
    return TRANSLATIONS[key][lang];
  };
}
