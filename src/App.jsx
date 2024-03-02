/* eslint-disable no-case-declarations */

import Error from "./components/Error";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Question from "./components/Question";
import ResultSection from "./components/ResultSection";
import Timer from "./components/Timer";
import WelcomeSection from "./components/WelcomeSection";
import { useQuiz } from "./context/QuizContext";

function App() {
  const { status } = useQuiz();

  return (
    <div className="md:w-5/12 w-10/12 m-auto text-slate-200 flex flex-col items-center justify-center">
      <div className="w-full">
        <Header />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <WelcomeSection />}
        {status === "active" && (
          <div className="w-full">
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </div>
        )}

        {status === "finished" && <ResultSection />}
      </div>
    </div>
  );
}

export default App;
