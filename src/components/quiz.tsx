import {useEffect, useState} from 'react';
import _ from "lodash";
import Question from './question';



type NewQuestion = {  
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
  }

  // creates question object array via api call link


const loading = [
    {
        thisQuestion: "Loading...",
        possibleAnswers: [""],
        answer: ""
    },
];


const Quiz = () => {

    const [newQuestions, setNewQuestions] = useState(loading);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [isGameFinished, setIsGameFinished] = useState(false);


    useEffect(() => {

        const APIQuestions = async() => {
            const response = await fetch("https://opentdb.com/api.php?amount=10");
            const result = await response.json();
            const data = await result.results;
        
        function decode(str: string) {

            let txt = new DOMParser().parseFromString(str, "text/html");
            
            return txt.documentElement.textContent;
            
            }

            console.log(data);
            const myQuizInfo = await data.map((item: NewQuestion) => {
                const allAnswers: string[] = [...item.incorrect_answers, item.correct_answer];
                const randomAnswers = _.shuffle(allAnswers);
                

                return {
                        thisQuestion: decode(item.question),
                        possibleAnswers: randomAnswers,
                        answer: decode(item.correct_answer)
                };
               
            });
        
            setNewQuestions(myQuizInfo);
        }

        APIQuestions()
    }, [isGameFinished])
    
   
    
    
   
    const handleAnswer = (chosenAnswer: string) => {
        setTimeout(() => {
            if (chosenAnswer === newQuestions[currentQuestion].answer) {
                setCorrectCount(correctCount + 1)
            }
    
            const nextQuestion = currentQuestion + 1;  
            if (nextQuestion < newQuestions.length) {
                setCurrentQuestion(nextQuestion)
            }
            else setIsGameFinished(true);
        }, 1500);
        
    };



  return (
    <div className='quiz-container'>
        <h1>Trivia Quiz</h1>
        {isGameFinished ? 
            <div>
                <p>Well done, you finished the quiz! You scored {correctCount}/10!</p>
                <button 
                    onClick={() => {
                        setCurrentQuestion(0);
                        setCorrectCount(0);
                        setIsGameFinished(false);
                }}>Start Again?</button>
            </div>
        : 
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
        }
        
    </div>
  )
}

export default Quiz