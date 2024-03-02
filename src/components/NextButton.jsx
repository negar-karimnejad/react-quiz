import { useQuiz } from "../context/QuizContext";

function NextButton() {
  const { answered, numQuestions, index, dispatch } = useQuiz();

  if (answered === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: "nextQuestion" })}
        className="bg-zinc-700 rounded-full w-20 h-10 p-1 transition-all hover:bg-transparent hover:border"
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: "finish" })}
        className="bg-zinc-700 rounded-full float-right px-5 h-10 p-1 transition-all hover:bg-transparent hover:border"
      >
        Finish
      </button>
    );
}

export default NextButton;
