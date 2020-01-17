import React,{Component} from 'react'
import {View,Text,TextInput,Button,Alert} from 'react-native'
import {connect} from 'react-redux'
import {handleSaveCard} from '../actions/decks'

/**
 * This class is where the user sets up the question and corresponding answer
 */
class  NewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionText: '',
            answerText:''
        };
      }
    render(){
        return(

            <View>
                <Text>New Card</Text>
                <TextInput
                    style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1,margin:5}}
                    placeholder="Enter question!"
                    onChangeText={(questionText) => this.setState({questionText})}
                    value={this.state.questionText}
                    />
           <TextInput
                    style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1,margin:5}}
                    placeholder="Enter answer!"
                    onChangeText={(answerText) => this.setState({answerText})}
                    value={this.state.answerText}
                    />
                <View  style={{alignItems:"left",justifyContent:"left",margin:10}}>
                     <Button title="Submit" onPress={() =>
                this.saveCard()} style={{margin:5}}></Button>
                </View>
            </View>
        )
    }

    saveCard = () => {
        const {dispatch} = this.props
        dispatch(handleSaveCard(this.props.deck.title,this.state.questionText,this.state.answerText))
    }
}



function mapStateToProps({decks},props){
    let title = props.navigation.state.params.title
    return {deck:decks[title]}
}

export default connect(mapStateToProps)(NewCard)