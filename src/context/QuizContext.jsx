/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useReducer } from "react";
import questions from "../data/data.json";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: questions,
  // "loading", "error","ready","active","finished"
  status: "loading",
  index: 0,
  answered: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state?.questions?.length * SECS_PER_QUESTION,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answered: null };
    case "answer":
      const question = state.questions[state.index];
      return {
        ...state,
        answered: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    default:
      throw new Error("Action Unknown");
  }
};

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [
    { questions, status, index, answered, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const question = questions[index];
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((curr, item) => curr + item.points, 0);

  const start = () => {
    dispatch({ type: "start" });
  };

  const tick = () => {
    dispatch({ type: "tick" });
  };

  const answer = (index) => {
    dispatch({ type: "answer", payload: index });
  };

  const nextQuestion = () => {
    dispatch({ type: "nextQuestion" });
  };

  const restart = () => {
    dispatch({ type: "restart" });
  };

  const finish = () => {
    dispatch({ type: "finish" });
  };

  useEffect(() => {
    dispatch({ type: "dataRecieved" });
  }, []);

  const value = {
    status,
    secondsRemaining,
    numQuestions,
    totalPoints,
    points,
    highScore,
    answered,
    index,
    question,
    start,
    restart,
    tick,
    answer,
    nextQuestion,
    finish,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context === undefined)
    throw new Error("QuizContext was used outside QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
