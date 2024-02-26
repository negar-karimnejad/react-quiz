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

const initialState = {
  questions: [],
  // "loading", "error","ready","active","finished"
  status: "loading",
  index: 0,
  answered: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
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
      return { ...state, status: "active" };
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
  const [{ questions, status, index, answered, points, highScore }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;

  const totalPoints = questions.reduce((curr, item) => curr + item.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  // useEffect(() => {
  //   let intervalId;

  //   if (isActive) {
  //     intervalId = setInterval(() => {
  //       setTimer((prevTimer) => {
  //         if (prevTimer === 0) {
  //           clearInterval(intervalId);
  //           setIsActive(false);
  //           return 0;
  //         }
  //         return prevTimer - 1;
  //       });
  //     }, 1000); // Update timer every second
  //   } else {
  //     clearInterval(intervalId);
  //   }

  //   return () => clearInterval(intervalId); // Cleanup function
  // }, [isActive]);

  // const formatTime = (time) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = time % 60;
  //   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // };
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
            <div className="flex justify-between w-full mt-10">
              <button className="border rounded-full w-20 h-10 p-1">
                {/* {formatTime(timer)} */}
              </button>
              <NextButton
                numQuestions={numQuestions}
                index={index}
                answered={answered}
                dispatch={dispatch}
              />
            </div>
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
