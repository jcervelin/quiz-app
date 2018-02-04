import React, { Component } from 'react';
import axios from 'axios'

class QuizApi extends Component {
    constructor (props) {
      super(props);
      this.state = {
        jsonTeste: {}
      }
    }


    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${props.state}`)
        .then(res => {
           this.setState({
            jsonTeste: res.data
           }) 
        })
        .catch(err => {
            console.log(err);
        })       
    }
    render() {
        return (
            null
        )
    }
};

export default QuizApi;