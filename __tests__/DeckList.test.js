import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import DeckList from '../components/DeckList'
import rootReducer from '../reducers'

jest.mock('../utils/api', () => ({
  getInitialData: jest.fn(() => Promise.resolve({ decks: {} })),
  getDecks: jest.fn(() => Promise.resolve({})),
  saveAnswer: jest.fn(() => Promise.resolve()),
  saveDeck: jest.fn(() => Promise.resolve()),
  saveCard: jest.fn(() => Promise.resolve()),
}))

const mockDecks = {
  React: {
    title: 'React',
    questions: [{ question: 'Q?', answer: 'A' }],
    qidx: 0,
    correct: 0,
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [],
    qidx: 0,
    correct: 0,
  },
}

function createTestStore(initialState) {
  return createStore(rootReducer, { decks: initialState }, applyMiddleware(thunk))
}

describe('DeckList', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  }

  it('renders without crashing', () => {
    const store = createTestStore(mockDecks)
    const tree = renderer.create(
      <Provider store={store}>
        <DeckList navigation={mockNavigation} />
      </Provider>
    )
    expect(tree.toJSON()).toBeTruthy()
  })

  it('displays the DECK LIST text', () => {
    const store = createTestStore(mockDecks)
    const tree = renderer.create(
      <Provider store={store}>
        <DeckList navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const texts = instance.findAllByType('Text')
    const textContents = texts.map(t => t.props.children)
    expect(textContents).toContain('DECK LIST')
  })

  it('renders deck titles', () => {
    const store = createTestStore(mockDecks)
    const tree = renderer.create(
      <Provider store={store}>
        <DeckList navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const texts = instance.findAllByType('Text')
    const textContents = texts.map(t => t.props.children)
    expect(textContents).toContain('React')
    expect(textContents).toContain('JavaScript')
  })

  it('renders Add a Deck button', () => {
    const store = createTestStore(mockDecks)
    const tree = renderer.create(
      <Provider store={store}>
        <DeckList navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const buttons = instance.findAllByType('Button')
    const addButton = buttons.find(b => b.props.title === 'Add a Deck')
    expect(addButton).toBeTruthy()
  })

  it('navigates to AddDeck when button is pressed', () => {
    const store = createTestStore(mockDecks)
    const tree = renderer.create(
      <Provider store={store}>
        <DeckList navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const buttons = instance.findAllByType('Button')
    const addButton = buttons.find(b => b.props.title === 'Add a Deck')
    addButton.props.onPress()
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AddDeck')
  })
})
