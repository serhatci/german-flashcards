import { useData } from "../../contexts/DataContext";
import {
  correctHomePageInput,
  toCamelCase,
  duplicateTitleCheck,
} from "../edit-pages/inputCheckFunctions";

export function useEditData() {
  const { titles, setTitles } = useData();

  function deleteHomePageTitle(buttonTitle) {
    let newTitles = titles.filter((title) => title.str !== buttonTitle);
    setTitles(newTitles);
  }

  function addHomePageTitle(text) {
    const correctedText = correctHomePageInput(text);

    if (duplicateTitleCheck(correctedText, titles)) return;

    const homePageTitleInput = {
      camelCase: toCamelCase(correctedText),
      str: correctedText,
    };
    const newTitles = [homePageTitleInput].concat(titles);
    setTitles(newTitles);
  }

  return { deleteHomePageTitle, addHomePageTitle };
}
