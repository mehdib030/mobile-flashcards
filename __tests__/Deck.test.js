import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Deck from '../components/Deck'
import rootReducer from '../reducers'

const mockDecks = {
  React: {
    title: 'React',
    questions: [
      { question: 'Is React fast?', answer: 'Yes' },
      { question: 'Is React a framework?', answer: 'No' },
    ],
    qidx: 0,
    correct: 0,
  },
}

function createTestStore(initialState) {
  return createStore(rootReducer, { decks: initialState })
}

describe('Deck', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    state: { params: { title: 'React' } },
  }

  it('renders without crashing', () => {
    const store = createTestStore(mockDecks)
    const tree = renderer.create(
      <Provider store={store}>
        <Deck navigation={mockNavigation} />
      </Provider>
    )
    expect(tree.toJSON()).toBeTruthy()
  })

  it('displays the deck title', () => {
    const store = createTestStore(mockDecks)
    const tree = renderer.create(
      <Provider store={store}>
        <Deck navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const texts = instance.findAllByType('Text')
    const textContents = texts.map(t => t.props.children)
    expect(textContents).toContain('React')
  })

  it('displays the card count', () => {
    const store = createTestStore(mockDecks)
    const tree = renderer.create(
      <Provider store={store}>
        <Deck navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const texts = instance.findAllByType('Text')
    const textContents = texts.map(t => {
      if (Array.isArray(t.props.children)) {
        return t.props.children.join('')
      }
      return t.props.children
    })
    expect(textContents.some(t => t && t.toString().includes('2'))).toBe(true)
  })

  it('navigates to AddCard when Add Card button is pressed', () => {
    const store = createTestStore(mockDecks)
    const tree = renderer.create(
      <Provider store={store}>
        <Deck navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const buttons = instance.findAllByType('Button')
    const addCardButton = buttons.find(b => b.props.title === 'Add Card')
    addCardButton.props.onPress()
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AddCard', { title: 'React' })
  })

  it('shows Start Quiz button when deck has questions', () => {
    const store = createTestStore(mockDecks)
    const tree = renderer.create(
      <Provider store={store}>
        <Deck navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const buttons = instance.findAllByType('Button')
    const quizButton = buttons.find(b => b.props.title === 'Start Quiz')
    expect(quizButton).toBeTruthy()
  })

  it('hides Start Quiz button when deck has no questions', () => {
    const emptyDecks = {
      React: { title: 'React', questions: [], qidx: 0, correct: 0 },
    }
    const store = createTestStore(emptyDecks)
    const tree = renderer.create(
      <Provider store={store}>
        <Deck navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const buttons = instance.findAllByType('Button')
    const quizButton = buttons.find(b => b.props.title === 'Start Quiz')
    expect(quizButton).toBeUndefined()
  })
})
