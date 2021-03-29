import React, { useState } from "react";

import { Words, Score, PlayAgain, GameButtons } from "./Flashcards-components";
import { useButtons } from "../../contexts/ButtonsContext";
import { useData } from "../../contexts/DataContext";
import "./flash-cards.css";

const FlashCards = (props) => {
  const { flashcards } = useData();
  const data = shuffleArray(flashcards[props.match.params.title]);

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  return <FlashCardsGame data={data} />;
};

const FlashCardsGame = (props) => {
  const regularOrder = useButtons();
  const [isCardAQuestion, setIsCardAQuestion] = useState(true);
  const [progress, setProgress] = useState({
    total: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
  });
  const [completed, setCompleted] = useState(false);

  function getPage() {
    if (!props.data.length) {
      return [
        <Words cardData={["Empty!", "Use settings to add new flashcards"]} />,
        [],
      ];
    }
    return completed
      ? [<Score result={progress} />, <PlayAgain func={restartGame} />]
      : [
          <Words cardData={getCardData()} />,
          <GameButtons
            changeCard={reverseCards}
            bringNextWord={bringNextWord}
            isCardAQuestion={isCardAQuestion}
          />,
        ];
  }

  function getCardData() {
    let cardData = Object.values(props.data[progress.total]);
    cardData = regularOrder.shuffle
      ? cardData
      : [cardData[2], cardData[3], cardData[0], cardData[1]];
    return isCardAQuestion ? cardData.slice(2, 4) : cardData.slice(0, 2);
  }

  function reverseCards() {
    setIsCardAQuestion(!isCardAQuestion);
  }

  function bringNextWord(answer) {
    answer
      ? setProgress({
          total: ++progress.total,
          correctAnswer: ++progress.correctAnswer,
          wrongAnswer: progress.wrongAnswer,
        })
      : setProgress({
          total: ++progress.total,
          correctAnswer: progress.correctAnswer,
          wrongAnswer: ++progress.wrongAnswer,
        });

    setIsCardAQuestion(!isCardAQuestion);
    if (props.data.length === progress.total) {
      setCompleted(!completed);
    }
  }

  function restartGame() {
    setIsCardAQuestion(true);
    setProgress({ total: 0, correctAnswer: 0, wrongAnswer: 0 });
    setCompleted(false);
  }

  return (
    <div className="flashcards-container fade-in">
      {getPage()[0]}
      {getPage()[1]}
    </div>
  );
};

export default FlashCards;
