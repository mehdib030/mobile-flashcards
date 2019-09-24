import React,{Component} from 'react'
import {View,Text,Button,Alert} from 'react-native'
import {connect} from 'react-redux'
import {handleSaveAnswer} from '../actions/decks'

import {
    clearLocalNotification,
    setLocalNotification
  } from '../utils/helpers'

class Quiz extends Component{

    state = {
        showAnswer:false,
        quizComplete:false,
        numberOfCorrectAnswers:0,
        totalRemainingQuestions:this.props.deck.questions.length
    }

    render(){
        return(

            <View style={{alignItems:"center",justifyContent:"center"}}> 
                <Text style={{fontSize:14,fontWeight:"bold",margin:10}}>{this.props.deck.title}</Text>
                {!this.state.quizComplete ?<Text>Total remaining number of questions: {this.state.totalRemainingQuestions}</Text>: null } 
                {!this.state.quizComplete ? <Text style={{fontSize:16,fontWeight:"bold",margin:10}}>{this.props.deck.questions[this.props.deck.qidx].question}</Text>: null } 
                {!this.state.quizComplete ?<Button title="Show Answer" onPress={() => this.showAnswer()} ></Button>: null } 
                   
                {this.state.showAnswer && !this.state.quizComplete ? <Text>{this.props.deck.questions[this.props.deck.qidx].answer}</Text> : null }  

                {this.state.quizComplete ?<Text>You have answered {this.state.numberOfCorrectAnswers} out of {this.props.deck.questions.length} questions!</Text>: null } 

                {!this.state.quizComplete ? <Button title="Correct" onPress={() => this.saveAnswer('Yes')} style={{margin:5}}></Button>: null } 
                {!this.state.quizComplete ?<Button title="Incorrect" onPress={() => this.saveAnswer('No')} ></Button>: null } 

                {this.state.quizComplete ? <Button title="Restart Quiz" onPress={() => this.resetState()} style={{margin:5}}></Button>: null } 
                {this.state.quizComplete ? <Button title="Back to Deck" onPress={() => this.props.navigation.navigate('Home')} ></Button> : null } 

            </View>
        )
    }

    showAnswer = () => {
        this.setState(previousState => ({ showAnswer: !previousState.showAnswer }))  
    }

    saveAnswer = (answer) => {
            const {dispatch} = this.props
            let correct = this.props.deck.correct;
            let qidx = this.props.deck.qidx
            
            this.setState({totalRemainingQuestions:this.state.totalRemainingQuestions-1})
            
            const correctAnswer = this.props.deck.questions[qidx].answer;
            
            if (answer === correctAnswer){
                correct++;
            } 
            if(qidx < this.props.deck.questions.length-1){
                qidx++
            }
            dispatch(handleSaveAnswer(this.props.deck.title,qidx,correct)).then(() => {
                
                if(this.state.totalRemainingQuestions == 0){
                    this.setState({
                        quizComplete:true,
                        showAnswer:false,
                        numberOfCorrectAnswers:this.props.deck.correct
                    })
                    dispatch(handleSaveAnswer(this.props.deck.title,0,0))
                    clearLocalNotification().then(setLocalNotification)
                }
            })
    }

    resetState = () =>{
        const {dispatch} = this.props
        dispatch(handleSaveAnswer(this.props.deck.title,0,0)).then(() => {
                
            if(this.state.totalRemainingQuestions == 0){
                this.setState({
                    quizComplete:false,
                    showAnswer:false,
                    numberOfCorrectAnswers:this.props.deck.correct,
                    totalRemainingQuestions:this.props.deck.questions.length
                })
            }
        })
    }
}




function mapStateToProps({decks},props){
    let title = props.navigation.state.params.title
    return {
        deck:decks[title]
    }
}

export default connect(mapStateToProps)(Quiz)