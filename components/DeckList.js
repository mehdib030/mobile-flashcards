import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text,TouchableOpacity,Button } from 'react-native'
import Deck from './Deck'

import {handleInitialData} from '../actions/shared'
//import Panel from 'react-native-panel';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
//import { TabNavigator, StackNavigator } from 'react-navigation'
import HomeScreen from './HomeScreen'


class DeckList extends Component {

    componentDidMount(){
        this.props.dispatch(handleInitialData())
    }

    render(){

        return (
        <View style={styles.contentContainerStyle}>


            <Text>DECK LIST</Text>
            
            {Object.values(this.props.decks).map((deck) => {
                return (

                    <View key={deck.title} style={styles.firstHeader}>
                            
                            <TouchableOpacity onPress={() =>
                             this.props.navigation.navigate('DeckView',{
                              title: deck.title,
                            })}>
                            <Text>{deck.title}</Text>
                            <Text>{deck.questions.length} Cards</Text>
                            </TouchableOpacity>
          
                       
                   </View>
                   
                     
                );
            })}
          <Button title="Add a Deck" onPress={() =>
                             this.props.navigation.navigate('AddDeck')}></Button>
        </View>

        )
    }
}





function mapStateToProps({decks}){
    return {decks:decks};
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
      backgroundColor: 'gray',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      height: 50,
      width: 200
    },
    thirdHeaderContainer: {
      margin: 5,
      width: 200,
      backgroundColor: 'grey',
      justifyContent: 'center',
      height: 50
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

export default connect(mapStateToProps)(DeckList)