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

export function correctHomePageInput(text) {
  let corrected = correctInput(text);
  return WordsToUpperCase(corrected);
}

export function correctInput(text) {
  let corrected = text.replaceAll("<div>", "");
  corrected = corrected.replaceAll("</div>", "");
  corrected = corrected.replaceAll("<br>", "");
  corrected = corrected.replaceAll("</br>", "");
  corrected = corrected.replaceAll("&nbsp", "");
  corrected = corrected.replaceAll("&lt", "");
  corrected = corrected.replaceAll("&gt", "");
  corrected = corrected.replaceAll(";", "");
  return corrected;
}

function WordsToUpperCase(corrected) {
  return corrected.toLowerCase().replace(/^.|\s\S/g, (a) => {
    return a.toUpperCase();
  });
}

export function duplicateTitleCheck(newTitle, buttons) {
  return buttons.find((title) => title.str === newTitle);
}

export function duplicateFlashcardsCheck(newFlashcard, flashcards) {
  return flashcards.find(
    (card) => JSON.stringify(card) === JSON.stringify(newFlashcard)
  );
}
