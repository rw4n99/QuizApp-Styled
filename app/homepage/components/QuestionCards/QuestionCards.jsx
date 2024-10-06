"use client";

//Import components
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Timer from '../GameTimer/GameTimer';
import SubHeader from '../SubHeader/SubHeader';
import Button from '../Button/Button';
import FailScreen from '../FailScreen/FailScreen';
import SuccessScreen from '../SuccessScreen/SuccessScreen';
import EndGame from '../EndGame/EndGame';

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
  const [correctAnswerBox, setCorrectAnswerBox] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Initialize Supabase client
  const supabaseUrl = 'https://gblyecsjjpamtbjrlwli.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdibHllY3NqanBhbXRianJsd2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMjg1OTYsImV4cCI6MjA0MzgwNDU5Nn0.zDuVgamSFVktx0TlS-PxRwqlv2hREJzUypMR9Ro8nLE';

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Fetch questions from API
  const randomCorrectAnswer = () => {
    const correctAnswerSelector = Math.floor(Math.random() * 4);
    setCorrectAnswerBox(correctAnswerSelector);
  }

  const shuffleAnswers = (correctAnswer, incorrectAnswers) => {
    const allAnswers = [...incorrectAnswers, correctAnswer];
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    setShuffledAnswers(allAnswers);
  }

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://the-trivia-api.com/v2/questions/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuestions(data);
      shuffleAnswers(data[0].correctAnswer, data[0].incorrectAnswers);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGameOver = () => {
    setEndGame(true);
  };

  useEffect(() => {
    fetchQuestions();
    randomCorrectAnswer();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleClick = (event) => {
    event.preventDefault();

    if (!answerSelected) {
      setSubmit(true);
      return;
    }

    setSubmit(true);
    if (pass && questionCount < 11 && lives > 0) {
      setScore((prevScore) => prevScore + 1);
      setShowSuccess(true);
      setShowFail(false);
      setQuestionCount((prevCount) => prevCount + 1);
    } else if (!pass && questionCount < 11 && lives > 0) {
      setLives((prevLives) => prevLives - 1);
      setShowFail(true);
      setShowSuccess(false);
      setQuestionCount((prevCount) => prevCount + 1);
    } else {
      setEndGame(true);
    }
  };

  const handleCloseScreens = () => {
    setShowSuccess(false);
    setShowFail(false);
    setAnswerSelected(false);
    setPass(null);
    fetchQuestions();
    randomCorrectAnswer();
  };

  const handleAnswerSelect = (selectedAnswerIndex) => {
    setAnswerSelected(true);
    setPass(shuffledAnswers[selectedAnswerIndex] === questions[0].correctAnswer);
  };

  return (
    <div>
      {endGame ? (
        <EndGame score={score} lives={lives} />
      ) : (
        <div>
          <div>
            <SubHeader score={score} progress={questionCount} lives={lives} timer={<Timer />} />
            <div className="pt-20 flex flex-col items-center justify-center h-screen space-y-2">
            <legend className="text-3xl font-bold text-center p-8">{questions[0].question.text}</legend>

    <div className="space-y-4 w-full max-w-md">
    {shuffledAnswers.map((answer, index) => (
      <div 
      key={index} 
      className="flex items-center p-4 bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white rounded-full 
      cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
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
                  {console.log('showSuccess', showSuccess, 'showFail', showFail)}
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
        </div>
      )}
    </div>
  );
}