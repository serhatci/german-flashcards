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

export function checkInput(text) {
  let corrected = text.replaceAll("<div>", "");
  corrected = corrected.replaceAll("</div>", "");
  corrected = corrected.replaceAll("<br>", "");
  corrected = corrected.replaceAll("</br>", "");
  corrected = corrected.replaceAll("&nbsp", "");
  corrected = corrected.replaceAll(";", "");
  return corrected;
}
