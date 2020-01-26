import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text,Button,Alert } from 'react-native'

let title1='Test';

class Deck extends Component {
    
    render(){ 
      
        return (
        <View style={{alignItems:"center",justifyContent:"center"}}>
           <Text style={{fontSize:14,fontWeight:"bold",margin:10}}>{this.props.deck.title}</Text>
            <Text style={{margin:5}}>{this.props.deck.questions.length} Cards</Text> 

            <Button title="Add Card" onPress={() =>
                             this.props.navigation.navigate('AddCard',{title: this.props.deck.title})} style={{margin:5}}></Button>
            {this.props.deck.questions.length > 0 ?<Button title="Start Quiz" onPress={() =>
                             this.props.navigation.navigate('QuizView',{title: this.props.deck.title})}></Button>:null}
        </View>
    )}
   
}

function mapStateToProps({decks},props){
    let title = props.navigation.state.params.title
    return {deck:decks[title]}
}

const styles = StyleSheet.create({
    contentContainerStyle: {
      paddingTop: 30,
      paddingBottom: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#eee',
    },
    firstHeaderContainer: {
      backgroundColor: '#ccc',
    },
    firstHeader: {
      marginHorizontal: 0,
      marginVertical: 10,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      height: 50,
      width: 200
    },
    thirdHeaderContainer: {
      margin: 5,
      width: 200,
      justifyContent: 'center',
      height: 200,
      alignItems: 'center',
    },
    myDescription: {
      padding: 10,
      paddingTop: 0,
    },
    customContent: {
      backgroundColor: '#bada55',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
    },
    square: {
      backgroundColor: 'yellow',
      width: 50,
      height: 50,
    },
    circle: {
      backgroundColor: 'blue',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
  });

export default connect(mapStateToProps)(Deck)