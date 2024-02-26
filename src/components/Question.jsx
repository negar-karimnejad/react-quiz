import Options from "./Options";

/* eslint-disable react/prop-types */
function Question({ question, dispatch, answered }) {
  return (
    <div className="mt-8">
      <h5 className="font-bold text-lg text-center">{question.question}</h5>
      <Options dispatch={dispatch} answered={answered} question={question} />
    </div>
  );
}

export default Question;
