/* eslint-disable react/prop-types */
function Options({ dispatch, answered, question }) {
  // const clickToAnswer = (i, question) => {
  //   if (answered) return; //For stop translate the answers Div
  //   // dispatch({ type: "answer", payload: i + 1 });
  //   if (question.correctOption === i) {
  //     dispatch({ type: "incPoints", payload: question.points });
  //   }
  //   dispatch({ type: "progress", payload: ((i + 1) / numQuestions) * 100 });
  // };
  const hasAnswered = answered !== null;
  return (
    <>
      {question.options.map((option, index) => (
        <button
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "answer", payload: index })}
          className={`text-left my-2 w-full flex items-center px-5 font-medium h-16 rounded-full transition-all ${
            hasAnswered
              ? "cursor-not-allowed"
              : "cursor-pointer bg-zinc-700 text-white hover:translate-x-4 hover:bg-transparent hover:border"
          }
            ${answered === index && "translate-x-4"}
            ${
              question.correctOption === index
                ? "bg-sky-500"
                : "bg-orange-400 text-black"
            }`}
        >
          <p>{option}</p>
        </button>
      ))}
    </>
  );
}

export default Options;
