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


const initialQuestions = [
    {
        thisQuestion: "Pulmonic refers to what part of the body?",
        possibleAnswers: ["Hand", "Foot", "Face", "Lungs"],
        answer: "Lungs"
    },
    {
        thisQuestion: "Which of the following accounts for 9% of deforestation?",
        possibleAnswers: ["Slash & Burn", "Mining", "Logging", "Forest Fires"],
        answer: "Forest Fires"
    },
    {
        thisQuestion: "Kia Motors originated from which country?",
        possibleAnswers: ["South Korea", "Japan", "China", "India"],
        answer: "South Korea"
    },
    {
        thisQuestion: "Pulmonic refers to what part of the body?",
        possibleAnswers: ["Hand", "Foot", "Face", "Lungs"],
        answer: "Lungs"
    },
    {
        thisQuestion: "Which of the following accounts for 9% of deforestation?",
        possibleAnswers: ["Slash & Burn", "Mining", "Logging", "Forest Fires"],
        answer: "Forest Fires"
    },
    {
        thisQuestion: "Kia Motors originated from which country?",
        possibleAnswers: ["South Korea", "Japan", "China", "India"],
        answer: "South Korea"
    },
    {
        thisQuestion: "Pulmonic refers to what part of the body?",
        possibleAnswers: ["Hand", "Foot", "Face", "Lungs"],
        answer: "Lungs"
    },
    {
        thisQuestion: "Which of the following accounts for 9% of deforestation?",
        possibleAnswers: ["Slash & Burn", "Mining", "Logging", "Forest Fires"],
        answer: "Forest Fires"
    },
    {
        thisQuestion: "Kia Motors originated from which country?",
        possibleAnswers: ["South Korea", "Japan", "China", "India"],
        answer: "South Korea"
    }
];


const Quiz = () => {

    const [newQuestions, setNewQuestions] = useState(initialQuestions);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [isCorrect, setIsCorrect] = useState();

    useEffect(() => {

        const APIQuestions = async() => {
            const response = await fetch("https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple");
            const result = await response.json();
            const data = await result.results;
        
            const myQuizInfo = await data.map((item: NewQuestion) => {
                const allAnswers: string[] = [...item.incorrect_answers, item.correct_answer];
                const randomAnswers = _.shuffle(allAnswers);
                
                return {
                        thisQuestion: item.question,
                        possibleAnswers: randomAnswers,
                        answer: item.correct_answer
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
        }, 2000);
        
    };



  return (
    <div>
        <h1>Quiz App</h1>
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
            <h2>Question {currentQuestion + 1}/10</h2>
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