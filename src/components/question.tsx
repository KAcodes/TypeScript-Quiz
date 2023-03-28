import React from 'react';
import {Button} from 'react-bootstrap';

type Prop = {
  question: string,
  choices: string[],
  answer: string,
  selectAnswer: (chosen: string) => void;
}

const Question: React.FC<Prop> = ({question, choices, answer, selectAnswer}) => {



    
  return (
    <div>
      <h4>{question}</h4>
      <div className="answers-list"
        onClick={(e) => {
          console.log("foo")
          //if (e.target)
        }}
      >
        { choices.map((choice) => (
          <button className='answers'
            onClick={(e) => {
              e.preventDefault();
              selectAnswer(choice)
              
              if (choice == answer) {
                  e.currentTarget.classList.add('correctAnswer')
                  console.log(choice, answer)
                  setTimeout(() => {
                    console.log("correct")
                    e.currentTarget.classList.remove('correctAnswer')
                  }, 2000) 
              }
              else {
                e.currentTarget.classList.add('incorrectAnswers');
                 setTimeout(() => {
                  console.log("wrong")
                  e.currentTarget.classList.remove('incorrectAnswers')
                }, 2000) 
            };

              

              

            }
          
          }
          >{choice}</button>
        ))} 
      </div>
    </div>
  )
};

export default Question