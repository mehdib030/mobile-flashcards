import React,{Component} from 'react'
import {View,Text,TextInput,Button,Alert,StatusBar} from 'react-native'
import {connect} from 'react-redux'
import {handleSaveDeck} from '../actions/decks'

class NewDeck extends Component {

    constructor(props) {
        super(props);
        this.state = {text: ''};
      }

   render(){
        //const [value, onChangeText] = React.useState('Deck title');

        return(

            <View>
                <StatusBar backgroundColor="blue" barStyle="light-content" />
                <Text style={{margin:5}}>New Deck</Text>
                <TextInput
                    style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1,margin:5}}
                    placeholder="Enter deck title!"
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    />
               
               <View  style={{alignItems:"left",justifyContent:"left",margin:10}}>
                 <Button title="Submit" onPress={() => this.saveDeck(this.state.text)} style={{margin:5}}></Button>
                </View>
            </View>
        )
    }
    saveDeck = (value) => {
        const {dispatch} = this.props
    
        console.log('VALUE = ',value)
    
        dispatch(handleSaveDeck(value)).then(() => {
            this.props.navigation.navigate('DeckView',{title: this.state.text,
        })})
    }
}

function mapStateToProps({decks}){
    return {decks:decks}
}

export default connect(mapStateToProps)(NewDeck)