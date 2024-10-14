import React, { useEffect, useState } from 'react';
import Timer from '../GameTimer/GameTimer';
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
      if (!response.ok) throw new Error('Failed to fetch questions');
      
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
    return allAnswers.sort(() => Math.random() - 0.5); // Cleaner shuffle
  };

  // Handle answer submission
  const handleClick = (event) => {
    event.preventDefault();

    if (!answerSelected) {
      setSubmit(true);
      return;
    }

    setSubmit(true);
    if (pass) {
      processCorrectAnswer();
    } else {
      processIncorrectAnswer();
    }

    if (lives === 0) setEndGame(true);
  };

  // Process correct answer
  const processCorrectAnswer = () => {
    setScore((prevScore) => prevScore + 1);
    setShowSuccess(true);
    setShowFail(false);
    setQuestionCount((prevCount) => prevCount + 1);
  };

  // Process incorrect answer
  const processIncorrectAnswer = () => {
    setLives((prevLives) => prevLives - 1);
    setShowFail(true);
    setShowSuccess(false);
    setQuestionCount((prevCount) => prevCount + 1);
  };

  // Timer end function
  const onTimerEnd = () => {
    setEndGamePass(true);
  };

  // Close success/fail screen
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (

    <div className="flex flex-col items-center justify-center">
    {endGamePass ? (
      <EndGamePass score={score} lives={lives} />
    ) : endGame ? (
      <EndGame score={score} lives={lives} />
    ) : (
      <div className="w-full">
        <SubHeader score={score} progress={questionCount} lives={lives} />
        <div className="flex flex-col items-center justify-center h-screen space-y-2">
          <Timer minutes={0} seconds={60} onTimerEnd={onTimerEnd} score={score} />
          {questions.length > 0 && (
            <legend className="text-xl font-bold text-center md:text-2xl lg:text-3xl xl:text-4xl">{questions[0].question.text}</legend>
          )}
          <div className="space-y-4 w-full max-w-md">
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
