import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import NewDeck from '../components/NewDeck'
import rootReducer from '../reducers'

jest.mock('../utils/api', () => ({
  getDecks: jest.fn(() => Promise.resolve({})),
  saveAnswer: jest.fn(() => Promise.resolve()),
  saveDeck: jest.fn(() => Promise.resolve()),
  saveCard: jest.fn(() => Promise.resolve()),
}))

function createTestStore() {
  return createStore(rootReducer, { decks: {} }, applyMiddleware(thunk))
}

describe('NewDeck', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  }

  it('renders without crashing', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <NewDeck navigation={mockNavigation} />
      </Provider>
    )
    expect(tree.toJSON()).toBeTruthy()
  })

  it('displays New Deck title', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <NewDeck navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const texts = instance.findAllByType('Text')
    const textContents = texts.map(t => t.props.children)
    expect(textContents).toContain('New Deck')
  })

  it('renders an input with placeholder', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <NewDeck navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const input = instance.findByType('TextInput')
    expect(input.props.placeholder).toBe('Enter deck title!')
  })

  it('renders a Submit button', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <NewDeck navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const button = instance.findByType('Button')
    expect(button.props.title).toBe('Submit')
  })

  it('updates text input value on change', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <NewDeck navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const input = instance.findByType('TextInput')
    act(() => {
      input.props.onChangeText('My New Deck')
    })
    const updatedInput = instance.findByType('TextInput')
    expect(updatedInput.props.value).toBe('My New Deck')
  })
})
