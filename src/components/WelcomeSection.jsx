/* eslint-disable react/prop-types */
function WelcomeSection({ dispatch, numQuestions }) {
  return (
    <>
      <div className="text-center mt-10">
        <h2 className="font-bold text-2xl">Welcome to the React Quiz!</h2>
        <p className="font-medium">
          {numQuestions} questions to test your React mastery
        </p>
        <button
          onClick={() => dispatch({ type: "start" })}
          className="mt-5 bg-zinc-700 rounded-full px-4 h-10 p-1 transition-all hover:bg-transparent hover:border"
        >
          Let&apos;s start!
        </button>
      </div>
    </>
  );
}

export default WelcomeSection;
