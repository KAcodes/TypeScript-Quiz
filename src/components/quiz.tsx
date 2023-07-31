import { useEffect, useState } from "react";
import _ from "lodash";
import Question from "./question";

type NewQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

const loading = [
  {
    thisQuestion: "Loading...",
    possibleAnswers: [""],
    answer: "",
  },
];

// Component returns quiz interface with functionality creating dynamic content

const Quiz = () => {
  const [newQuestions, setNewQuestions] = useState(loading);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  // async func creates data to be used as questions through fetch API, updates every time quiz is finished
  useEffect(() => {
    const APIQuestions = async () => {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const result = await response.json();
      const data = await result.results;
      
      //function converts html entities from fetch return into strings
      function decode(str: string) {
        let txt = new DOMParser().parseFromString(str, "text/html");
        return txt.documentElement.textContent;
      }

      //shuffles answers array
      const myQuizInfo = await data.map((item: NewQuestion) => {
        const allAnswers: string[] = [
          ...item.incorrect_answers,
          item.correct_answer,
        ];
        const randomAnswers = _.shuffle(allAnswers).map((question) =>
          decode(question)
        );

        return {
          thisQuestion: decode(item.question),
          possibleAnswers: randomAnswers,
          answer: decode(item.correct_answer),
        };
      });
      setNewQuestions(myQuizInfo);
      console.log(data)
    };

    APIQuestions();
  }, [loadingStatus]);

  const handleAnswer = (chosenAnswer: string) => {
    const nextQuestion = currentQuestion + 1;
    setTimeout(() => {
      if (chosenAnswer === newQuestions[currentQuestion].answer) {
        setCorrectCount(correctCount + 1);
      }

      if (nextQuestion < newQuestions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setIsGameFinished(true);
        setLoadingStatus(prev => !prev); 
        setCurrentQuestion(0);
      }
    }, 1200);
  };

  return (
    <div id="quiz-container">
      <div id="quiz">
      <h1>Trivia Quiz</h1>
      {isGameFinished ? (
        <div>
          <p>Well done, you finished the quiz! You scored {correctCount}/10!</p>
          <button
            id="restart-btn"   
            onClick={(e) => {
              e.currentTarget.disabled = true
              setTimeout(() => {
                setIsGameFinished(false);
                setCorrectCount(0);
              }, 1000)
              
            }}
          >
            Start Again?
          </button>
        </div>
      ) : (
        <div>
          <h3>Question {currentQuestion + 1}/10</h3>
          <Question
            question={newQuestions[currentQuestion].thisQuestion}
            choices={newQuestions[currentQuestion].possibleAnswers}
            answer={newQuestions[currentQuestion].answer}
            selectAnswer={handleAnswer}
          />
          <h4>Correct Answers: {correctCount}</h4>
        </div>
      )}
      </div>
    </div>
  ); 
};

export default Quiz;
