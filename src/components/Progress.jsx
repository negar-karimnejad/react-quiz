import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { numQuestions, index, points, totalPoints, answered } = useQuiz();
  return (
    <div className="w-full progress">
      <progress value={index + Number(answered !== null)} max={numQuestions} />
      <div className="flex justify-between items-center w-full">
        <p>
          Question {index + 1} / {numQuestions}
        </p>
        <p>
          {points} / {totalPoints} points
        </p>
      </div>
    </div>
  );
}

export default Progress;
