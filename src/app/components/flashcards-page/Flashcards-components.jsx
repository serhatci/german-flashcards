import { FlipIcon, CorrectIcon, WrongIcon } from "../icons/Icons.jsx";
import { useTheme } from "../../contexts/ThemeContext";

export const Words = (props) => {
  const theme = useTheme();
  return (
    <div className="word-container" style={theme.words}>
      <p className="word">{props.cardData[0]}</p>
      <p className="info">{props.cardData[1]}</p>
    </div>
  );
};

export const Score = (props) => {
  const theme = useTheme();
  return (
    <div className="fade-in word-container">
      <div className="score-box" id="score" style={theme.score}>
        <strong>You have completed all Flashcards!</strong>
        <table id="score-table">
          <tbody>
            <tr>
              <td>Total Cards Played: </td>
              <td>
                <strong>{props.result.total}</strong>
              </td>
            </tr>
            <tr>
              <td>Correct Answers: </td>
              <td>
                <strong>{props.result.correctAnswer}</strong>
              </td>
            </tr>
            <tr>
              <td>Wrong Answers: </td>
              <td>
                <strong>{props.result.wrongAnswer}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PlayAgain = (props) => {
  return (
    <div className="card-buttons">
      <FlipIcon
        func={props.func}
        styles="bi bi-arrow-repeat icon large rotate"
      />
    </div>
  );
};

export const GameButtons = (props) => {
  function getStyles() {
    return props.isCardAQuestion
      ? {
          correctButton: "hide",
          flipButton: "bi bi-arrow-repeat icon large rotate delayed",
          wrongButton: "hide",
        }
      : {
          correctButton: "show fade-in bi bi-check-square-fill icon large",
          flipButton: "bi bi-arrow-repeat icon medium",
          wrongButton: "show fade-in bi bi-x-square-fill icon large",
        };
  }

  return (
    <div className="card-buttons" id="card-buttons">
      <div
        className="flex-horizontal flex-width-400"
        id="answer-buttons-container"
      >
        <CorrectIcon
          func={props.bringNextWord}
          styles={getStyles().correctButton}
        />
        <FlipIcon func={props.changeCard} styles={getStyles().flipButton} />
        <WrongIcon
          func={props.bringNextWord}
          styles={getStyles().wrongButton}
        />
      </div>
    </div>
  );
};
