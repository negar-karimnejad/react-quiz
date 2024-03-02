import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

/* eslint-disable react/prop-types */
function Question() {
  const { question } = useQuiz();

  return (
    <div className="mt-8">
      <h5 className="font-bold text-lg text-center">{question?.question}</h5>
      <Options />
    </div>
  );
}

export default Question;
