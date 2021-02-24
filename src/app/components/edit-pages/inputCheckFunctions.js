export function toCamelCase(sentence) {
  return sentence.replace(
    /(?:^\w|[A-Z]|\b\w|\s+)/g,
    function (camelCaseMatch, i) {
      if (+camelCaseMatch === 0) return "";
      return i === 0
        ? camelCaseMatch.toLowerCase()
        : camelCaseMatch.toUpperCase();
    }
  );
}

export function correctInput(text) {
  let corrected = text.replaceAll("<div>", "");
  corrected = corrected.replaceAll("</div>", "");
  corrected = corrected.replaceAll("<br>", "");
  corrected = corrected.replaceAll("</br>", "");
  corrected = corrected.replaceAll("&nbsp", "");
  corrected = corrected.replaceAll(";", "");
  corrected = WordsToUpperCase(corrected);
  return corrected;
}

export function WordsToUpperCase(corrected) {
  return corrected.toLowerCase().replace(/^.|\s\S/g, (a) => {
    return a.toUpperCase();
  });
}

export function duplicateTitleCheck(newTitle, buttons) {
  return buttons.find((title) => title.str === newTitle);
}

export function duplicateFlashcardsCheck(newFlashcard, flashcards) {
  return flashcards.find((card) => card === newFlashcard);
}
