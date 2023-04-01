import React from 'react';
import {Button} from 'react-bootstrap';

type Prop = {
  question: string,
  choices: string[],
  answer: string,
  selectAnswer: (chosen: string) => void;
}

const Question: React.FC<Prop> = ({question, choices, answer, selectAnswer}) => {

const highlightResponse = (guess: string, answ: string) => {
  const buttonAnswers = document.querySelectorAll("button");
    for (let i = 0; i < buttonAnswers.length; i++){

      if (buttonAnswers[i].innerHTML == answ){
        buttonAnswers[i].classList.add("correctAnswer");
        setTimeout(() => {
          buttonAnswers[i].classList.remove("correctAnswer")
        }, 1500);
      };

      if (buttonAnswers[i].innerHTML == guess && buttonAnswers[i].innerHTML != answ) {
        buttonAnswers[i].classList.add("incorrectAnswers");
        setTimeout(() => {
          buttonAnswers[i].classList.remove("incorrectAnswers")
        }, 1500);
      }
    }
}

    
  return (
    <div>
      <h4>{question}</h4>
      <div className="answers-list">
        { choices.map((choice) => (
          <button className='answers'
            onClick={(e) => {
              e.preventDefault();
              selectAnswer(choice)
              highlightResponse(choice, answer)
          }
        }
        >{choice}</button>
        ))} 
      </div>
    </div>
  )
};

export default Question