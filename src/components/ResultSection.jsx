/* eslint-disable react/prop-types */
function ResultSection({ dispatch, points, totalPoints }) {
  return (
    <div className="text-center">
      <p className="bg-sky-500 rounded-full h-12 flex items-center justify-center font-medium text-md w-5/6 m-auto mb-4">
        🤨You scored {points} out of {totalPoints} (
        {Math.ceil((points * 100) / totalPoints)}%)
      </p>
      <p>(Highscore: X points)</p>
      <button
        className="bg-zinc-700 rounded-full float-right mt-10 px-5 h-10 p-1 transition-all hover:bg-transparent hover:border"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default ResultSection;
