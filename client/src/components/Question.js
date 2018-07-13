import React, { Component } from 'react'
import quiz from '../Quiz.json';
import Answer from './Answer';
import { Dimmer, Header, Icon, Button } from 'semantic-ui-react';
import Gauge from './Victory.js';

export default class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      active: false,
      addClass: false,
      correct: true,
      score: 0,
      question: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.', e.target.innerHTML);
    let answered = e.target.innerText.charAt(0);
    let currentQ = this.state.question;
    let answer = quiz[0].questions[currentQ].correctAnswer;
    let currentScore = this.state.score;
    answered === answer ? this.setState({ correct: true, score: currentScore + 1 }) : this.setState({ correct: false });
    console.log('The link was clicked.', answered);
    console.log(answer, quiz[0].questions[0]);
    // this.setState({ active: true });
    setTimeout(() => {
      this.handleOpen();
    }, 1000)
    setTimeout(() => {
      let nextQ = 0;
      let numberOfQuestions = Object.keys(quiz[0].questions).length; // Currently 5
      this.state.question === numberOfQuestions - 1 ? console.log('win condition?') : nextQ = this.state.question + 1;
      this.setState({ question: nextQ });
      this.state.question === 0 ? this.setState({ question: 1}) : console.log('Do nothing.');
    }, 1000)
    setTimeout(() => {
      // this.handleClose();
    }, 3000)
  }
  handleOpen = () => this.setState({ active: true })
  // handleClose = () => this.setState({ active: false })
  handleClose = () => {
    let numberOfQuestions = Object.keys(quiz[0].questions).length; // Currently 6
    if (this.state.question === numberOfQuestions - 1){
      console.log('Take win condition action on close'); // ? How keep score -> props down
      this.setState({ active: false })
    }
    this.setState({ active: false })
  }

  handleReset(e) {
    e.preventDefault();
    console.log('clicked');
    this.setState({
          active: false,
          addClass: false,
          correct: true,
          score: 0,
          question: 0 });
  }

  render() {
    let currentQuestion = this.state.question;
    const { active } = this.state
    let numberOfQuestions = Object.keys(quiz[0].questions).length;
    let dispy = 0;
    currentQuestion !== 0 ? dispy = currentQuestion - 1 : dispy = currentQuestion;
    let ques = quiz[0].questions[currentQuestion].question;
    let fullAnswer = quiz[0].questions[dispy].correctText;
    let boxyClass = ["boxy"];
    if(this.state.addClass) {
        boxyClass.push('green');
      }
    function correct() { return (
        <div>
        <i class="check icon"></i>
        <p>Correct!</p>
        </div>
      )
    }
    function incorrect() { return (
        <div>
        <i class="times icon"></i>
        <p>Incorrect!</p>
        </div>
      )
    }

    return (
      <div className={this.state.question >= 5? 'endblue' : 'nothing'}>
        <h1 className="quiz-header"></h1>
        { currentQuestion < 5 &&
        <div className="full-container">
          <Gauge questionper={(currentQuestion + 1)/numberOfQuestions} questionnumber={currentQuestion + 1} />
          <div className="quiz-container">
              <div className="question box">
                <p>{ques}</p>
              </div>
              <ul onClick={this.handleClick} className="answers">
                <Answer answerlet="a" questionnum={currentQuestion} />
                <Answer answerlet="b" questionnum={currentQuestion} />
                <Answer answerlet="c" questionnum={currentQuestion} />
              </ul>
            {/*<button className="box">Send<span>&rsaquo;</span></button>*/}
          </div>
        </div>
        }
        { currentQuestion === 5 &&
          <div>
          <h2 className="quiz-complete-h2">Quiz Complete</h2>
          <h1 className="final-score-h1">You got <span className="final-score">{this.state.score}</span>
            <br /> out of <span className="final-score">{this.state.question}</span>
            <br />correct!
          </h1>
          </div>
        }
          <Dimmer id={this.state.correct? 'blueback' : 'redback'} active={active} onClick={this.handleClose} page>
            <Header as='h2' icon inverted>
              {this.state.correct ? correct() : incorrect()}
              <Header.Subheader className="subtext">{fullAnswer}</Header.Subheader>
              <div className="touch-continue"><Icon name='hand pointer outline' />Touch to continue...</div>
            </Header>
          </Dimmer>
          <br /><br />
          <div className="bbutn">
            <Button circular icon='redo' color='black' size='massive' onClick={this.handleReset} />
            <br />
            <br />
            <p>Start Again?</p>
          </div>
      </div>
    )
  }
}
