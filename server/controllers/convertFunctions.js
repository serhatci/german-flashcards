export function frontendData(data) {
  const username = data[0].userName;
  const titles = data[0].topics.map((el) => {
    return { str: el.title, camelCase: toCamelCase(el.title) };
  });
  let cards = {};
  for (let item of data[0].topics) {
    cards[toCamelCase(item.title)] = item.flashcards;
  }
  return {
    username: username,
    titles: titles,
    flashcards: cards,
  };
}

export function backendData(data) {
  // userID: currentUser.uid,
  // flashcard_titles: titles,
  // cards: flashcards,

  function matchingCards(title) {
    try {
      return data.cards[title];
    } catch {
      return [];
    }
  }

  let topics = [];
  for (let item of data["flashcard_titles"]) {
    topics.push({
      title: item.str,
      flashcards: matchingCards(item.camelCase),
    });
  }

  return topics;
}

function toCamelCase(sentence) {
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
