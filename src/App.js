import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import QuizFake from './api/QuizFake';
import Panel from './Panel';
import axios from 'axios'

const config = {	headers: {'Content-Type': 'application/json','Cache-Control' : 'no-cache'}, crossdomain : true};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizes: [],
      answeredQuestions: [],
      currentQuiz: {},
      results: 0,
      isLoading: true
    }
  }


  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      isLoading: true
    })
    axios.get('http://localhost:8083/quizes?states=SP',config)
      .then(res => {
        this.setState({
          quizes: res.data,
          isLoading: false,
          currentQuiz: res.data[0]
        });
        console.log("Quiz inicial: ",JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.submitForm = this.submitForm.bind(this);
  }

  postSubmitQuiz(data) { 
    axios.post('http://localhost:8083/quizes/result', data, config)
      .then(res => {
        this.setState({
          results: res.data
        })
        console.log("postSubmitQuiz res.data: ",JSON.stringify(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  buildPost(data) {
    const { currentQuiz } = this.state;
    let tempQuiz = JSON.parse(JSON.stringify(currentQuiz));
    tempQuiz.questions.forEach(q => data.questions.forEach(qa => q.alternatives.forEach(a => 
      {
        if(a.text === qa.alternatives[0].text) {         
          a.correct = qa.alternatives[0].correct;          
        }
      }
    )));
    return tempQuiz;

  }

  submitForm(event) {
    event.preventDefault();
    const { currentQuiz } = this.state;
    const formData = new FormData(event.target);
    let questionsAnswered = [];
    for (var pair of formData.entries()) {
      let questao = { 'name': pair[0], 'alternatives': [{ 'text': pair[1], 'correct': true }] }
      questionsAnswered.push(questao);
    }

    if(questionsAnswered.length !== currentQuiz.questions.length) {
      alert("Você precisa responder a todas as questões.");
    } else {
      let buildQuiz = { 'id': currentQuiz.id, 'name': currentQuiz.name , 'questions': questionsAnswered };
      buildQuiz = this.buildPost(buildQuiz);
      this.setState(
        {
          answeredQuestions: questionsAnswered,
          currentQuiz : buildQuiz
        }
      )
      this.postSubmitQuiz(buildQuiz);
    }
  }

  renderPanel() {
    return (<Panel submitForm={this.submitForm} questions={this.state.quizes[0].questions} />)
  }

  renderResult() {
    return (<h2>Você acertou {this.state.results}% das questões</h2>)
  }

  render() {
    const { isLoading, quizes } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Quiz</h1>
        </header>
        <div className={`content ${isLoading ? 'is-loading' : ''}`}>
          <div className="panel-group">
            {
              (!isLoading && quizes !== undefined && quizes.length > 0) ?
                (this.state.answeredQuestions.length === 0 ? this.renderPanel() : this.renderResult())
                : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
