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
      <div>
        { choices.map((choice) => (
          <button
            onClick={() => {selectAnswer(choice)}}
          >{choice}</button>
        ))} 
      </div>
    </div>
  )
};

export default Question