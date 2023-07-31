import React from "react";

type Prop = {
  question: string;
  choices: string[];
  answer: string;
  selectAnswer: (chosen: string) => void;
};

// Component returns question with optional answers
// Button click changes colour of buttons and determines if guess is correct

const Question: React.FC<Prop> = ({
  question,
  choices,
  answer,
  selectAnswer,
}) => {

  const highlightResponse = (guess: string, answ: string) => {
    const buttonAnswers = document.querySelectorAll("button");
    for (let i = 0; i < buttonAnswers.length; i++) {
      if (buttonAnswers[i].innerHTML == answ) {
        buttonAnswers[i].classList.add("correctAnswer");
        setTimeout(() => {
          buttonAnswers[i].classList.remove("correctAnswer");
        }, 1200);
      }

      if (
        buttonAnswers[i].innerHTML == guess && buttonAnswers[i].innerHTML != answ
      ) {
        buttonAnswers[i].classList.add("incorrectAnswers");
        setTimeout(() => {
          buttonAnswers[i].classList.remove("incorrectAnswers");
        }, 1200);
      }
      
      buttonAnswers[i].disabled = true;
      setTimeout(() => {
        buttonAnswers[i].disabled = false;
      }, 1200);
      
    }
  };

  return (
    <div>
      <h5 id="question">{question}</h5>
      <div className="answers-list">
        {choices.map((choice, index) => (
          <button
            key={index}
            className="answers my-2"
            onClick={(e) => {
              e.preventDefault();
              selectAnswer(choice);
              highlightResponse(choice, answer);
            }}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
