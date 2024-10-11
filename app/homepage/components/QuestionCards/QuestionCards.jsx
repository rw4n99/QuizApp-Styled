import React, { useEffect, useState } from 'react';
import Timer from '../GameTimer/GameTimer'; // External Timer component
import SubHeader from '../SubHeader/SubHeader';
import Button from '../Button/Button';
import FailScreen from '../FailScreen/FailScreen';
import SuccessScreen from '../SuccessScreen/SuccessScreen';
import EndGame from '../EndGame/EndGame';
import EndGamePass from '../EndGamePass/EndGamePass';

export default function QuestionCards() {
  const [submit, setSubmit] = useState(false);
  const [pass, setPass] = useState(null);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [endGamePass, setEndGamePass] = useState(false);


  // Fetch questions from API
  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://the-trivia-api.com/v2/questions?difficulty=easy');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuestions(data);
      setShuffledAnswers(shuffleAnswers(data[0].correctAnswer, data[0].incorrectAnswers));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Shuffle answers
  const shuffleAnswers = (correctAnswer, incorrectAnswers) => {
    const allAnswers = [...incorrectAnswers, correctAnswer];
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    return allAnswers;
  };

  // Handle click event for uestion submission
  const handleClick = (event) => {
    event.preventDefault();

    if (!answerSelected) {
      setSubmit(true);
      return;
    }

    setSubmit(true);
    if (pass) {
      setScore((prevScore) => prevScore + 1);
      setShowSuccess(true);
      setShowFail(false);
      setQuestionCount((prevCount) => prevCount + 1);
    } else if (!pass) {
      setLives((prevLives) => prevLives - 1);
      setShowFail(true);
      setShowSuccess(false);
      setQuestionCount((prevCount) => prevCount + 1);
    } else {
      setEndGame(true);
    }
  };


  //Old handleClick function for form submission - not used anymore - uses lives
//   setSubmit(true);
//   if (pass && lives > 0) {
//     setScore((prevScore) => prevScore + 1);
//     setShowSuccess(true);
//     setShowFail(false);
//     setQuestionCount((prevCount) => prevCount + 1);
//   } else if (!pass && lives > 0) {
//     setLives((prevLives) => prevLives - 1);
//     setShowFail(true);
//     setShowSuccess(false);
//     setQuestionCount((prevCount) => prevCount + 1);
//   } else {
//     setEndGame(true);
//   }
// };


// Timer end function
  const onTimerEnd = () => {
    setEndGamePass(true);
  };

  // Close screens function
  const handleCloseScreens = () => {
    setShowSuccess(false);
    setShowFail(false);
    setAnswerSelected(false);
    setPass(null);
    fetchQuestions();
  };

  const handleAnswerSelect = (selectedAnswerIndex) => {
    setAnswerSelected(true);
    setPass(shuffledAnswers[selectedAnswerIndex] === questions[0].correctAnswer);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {endGamePass ? (
        <EndGamePass score={score} lives={lives} />
      ) : endGame ? (
        <EndGame score={score} lives={lives} />
      ) : (
        <div>
          <SubHeader score={score} progress={questionCount} lives={lives} />
          {/** Timer component**/}
          <div className="pt-20 flex flex-col items-center justify-center h-screen space-y-2">
            <Timer minutes={0} seconds={60} onTimerEnd={onTimerEnd} score={score}/>
            {questions.length > 0 && (
              <legend className="text-3xl font-bold text-center p-8">{questions[0].question.text}</legend>
            )}
            <div className="space-y-4 w-full max-w-md">
              {/** Answers, mapped**/}
              {shuffledAnswers.map((answer, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-4 bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white rounded-full 
                  cursor-pointer transition duration-300 ease-in-out transform z-0 hover:scale-105 shadow-md">
                  <input
                    type="radio"
                    id={`Answer${index + 1}`}
                    name="Answer"
                    onClick={() => handleAnswerSelect(index)}
                    className="w-6 h-6 mr-4"
                  />
                  <label htmlFor={`Answer${index + 1}`} className="text-2xl">
                    {answer}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button
                text="Submit"
                background="bg-[#80D39B] text-2xl px-8 py-4"
                onClick={handleClick}
              />
            </div>
          </div>
          <div>
            {/** Ternary operator for showing fail or success screens**/}
            {!answerSelected && submit ? (
              'Please select an answer'
            ) : (
              <>
                {showSuccess && (
                  <SuccessScreen onClose={handleCloseScreens} score={score} />
                )}
                {showFail && (
                  <FailScreen onClose={handleCloseScreens} correctAnswerVar={questions[0].correctAnswer} />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
