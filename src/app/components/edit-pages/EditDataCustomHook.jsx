import update from "immutability-helper";
import { useData } from "../../contexts/DataContext";
import {
  correctInput,
  duplicateFlashcardsCheck,
  correctHomePageInput,
  toCamelCase,
  duplicateTitleCheck,
} from "../edit-pages/inputCheckFunctions";

export function useEditData() {
  const { titles, setTitles, flashcards, setFlashcards } = useData();

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

  function addFlashcard(question, questionExtra, answer, answerExtra, title) {
    const correctedQuestion = correctInput(question);
    const correctedQuestionExtra = correctInput(questionExtra);
    const correctedAnswer = correctInput(answer);
    const correctedAnswerExtra = correctInput(answerExtra);

    if (!correctedQuestion || !correctedAnswer) return false;

    const flashcardInput = {
      question: correctedQuestion,
      questionExtra: correctedQuestionExtra,
      answer: correctedAnswer,
      answerExtra: correctedAnswerExtra,
    };

    if (duplicateFlashcardsCheck(flashcardInput, flashcards[title]))
      return false;

    const newFlashcards = update(flashcards, {
      [title]: { $unshift: [flashcardInput] },
    });
    setFlashcards(newFlashcards);
    return true;
  }

  function editFlashcard(
    question,
    questionExtra,
    answer,
    answerExtra,
    title,
    card
  ) {
    const correctedQuestion = correctInput(question);
    const correctedQuestionExtra = correctInput(questionExtra);
    const correctedAnswer = correctInput(answer);
    const correctedAnswerExtra = correctInput(answerExtra);

    if (!correctedQuestion || !correctedAnswer) return false;

    const flashcardInput = {
      question: correctedQuestion,
      questionExtra: correctedQuestionExtra,
      answer: correctedAnswer,
      answerExtra: correctedAnswerExtra,
    };

    if (duplicateFlashcardsCheck(flashcardInput, flashcards[title]))
      return false;

    // Adds new card
    let newFlashcards = update(flashcards, {
      [title]: { $unshift: [flashcardInput] },
    });

    // Deletes already edited card
    newFlashcards[title] = newFlashcards[title].filter(
      (titleCard) => JSON.stringify(titleCard) !== JSON.stringify(card)
    );

    setFlashcards(newFlashcards);
    return true;
  }

  function deleteFlashcard(title, card) {
    const newTitles = flashcards[title].filter(
      (titleCard) => JSON.stringify(titleCard) !== JSON.stringify(card)
    );
    const newFlashcards = update(flashcards, {
      [title]: { $set: newTitles },
    });
    setFlashcards(newFlashcards);
  }

  return {
    deleteHomePageTitle,
    addHomePageTitle,
    addFlashcard,
    editFlashcard,
    deleteFlashcard,
  };
}
