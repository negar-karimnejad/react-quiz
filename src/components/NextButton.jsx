/* eslint-disable react/prop-types */
function NextButton({ answered, dispatch }) {
  if (answered === null) return null;
  return (
    <button
      onClick={() => dispatch({ type: "nextQuestion" })}
      className="bg-zinc-700 rounded-full w-20 h-10 p-1 transition-all hover:bg-transparent hover:border"
    >
      Next
    </button>
  );
}

export default NextButton;
