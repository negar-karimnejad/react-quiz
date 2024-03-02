import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

function Question() {
  const { index, questions } = useQuiz();
  const question = questions[index];

  return (
    <div className="mt-8">
      <h5 className="font-bold text-lg text-center">{question?.question}</h5>
      <Options question={question} />
    </div>
  );
}

export default Question;
