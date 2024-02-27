/* eslint-disable no-case-declarations */
import { useEffect, useReducer } from "react";

import Error from "./components/Error";
import Header from "./components/Header";
import Loader from "./components/Loader";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Question from "./components/Question";
import ResultSection from "./components/ResultSection";
import WelcomeSection from "./components/WelcomeSection";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

const SECS_PER_QUESTION = 30
const initialState = {
  questions: [],
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
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
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

function App() {
  const [
    { questions, status, index, answered, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  const totalPoints = questions.reduce((curr, item) => curr + item.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="md:w-5/12 w-10/12 m-auto text-slate-200 flex flex-col items-center justify-center">
      <div className="w-full">
        <Header />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <WelcomeSection numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <div className="w-full">
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              totalPoints={totalPoints}
              answered={answered}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answered={answered}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                numQuestions={numQuestions}
                index={index}
                answered={answered}
                dispatch={dispatch}
              />
            </Footer>
          </div>
        )}

        {status === "finished" && (
          <ResultSection
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </div>
    </div>
  );
}

export default App;
