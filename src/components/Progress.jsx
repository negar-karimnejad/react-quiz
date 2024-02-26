/* eslint-disable react/prop-types */
function Progress({
  numQuestions,
  index,
  points,
  totalPoints,
  progressPercent,
}) {
  return (
    <div className="w-full">
      <div className="relative h-2 bg-slate-200 rounded-full mb-2">
        <div
          style={{ width: `${progressPercent}%` }}
          className={`absolute top-0 left-0 bg-sky-600 rounded-full h-full`}
        ></div>
      </div>
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
