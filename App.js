import React, {Component}  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeckList from './components/DeckList'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Deck from './components/Deck'
import NewCard from './components/NewCard'
import NewDeck from './components/NewDeck'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'

const store = createStore(reducer,middleware)

class App extends Component {

  componentDidMount() {
    setLocalNotification()
  }

  render(){
    return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );}
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: DeckList,
  },
  DeckView: {
    screen:Deck,
  },
  AddDeck: {
    screen:NewDeck
  },
  AddCard: {
    screen:NewCard
  },
  QuizView: {
    screen:Quiz
  }
});

let Navigation = createAppContainer(AppNavigator);

export default App



