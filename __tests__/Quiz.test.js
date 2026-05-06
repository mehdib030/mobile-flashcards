import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Quiz from '../components/Quiz'
import rootReducer from '../reducers'

jest.mock('../utils/api', () => ({
  getDecks: jest.fn(() => Promise.resolve({})),
  saveAnswer: jest.fn(() => Promise.resolve()),
  saveDeck: jest.fn(() => Promise.resolve()),
  saveCard: jest.fn(() => Promise.resolve()),
}))

jest.mock('../utils/helpers', () => ({
  clearLocalNotification: jest.fn(() => Promise.resolve()),
  setLocalNotification: jest.fn(),
}))

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

function createTestStore() {
  return createStore(rootReducer, { decks: mockDecks }, applyMiddleware(thunk))
}

describe('Quiz', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    state: { params: { title: 'React' } },
  }

  it('renders without crashing', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <Quiz navigation={mockNavigation} />
      </Provider>
    )
    expect(tree.toJSON()).toBeTruthy()
  })

  it('displays the deck title', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <Quiz navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const texts = instance.findAllByType('Text')
    const textContents = texts.map(t => t.props.children)
    expect(textContents).toContain('React')
  })

  it('displays the first question', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <Quiz navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const texts = instance.findAllByType('Text')
    const textContents = texts.map(t => t.props.children)
    expect(textContents).toContain('Is React fast?')
  })

  it('shows remaining questions count', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <Quiz navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const texts = instance.findAllByType('Text')
    const textContents = texts.map(t => {
      if (Array.isArray(t.props.children)) return t.props.children.join('')
      return t.props.children
    })
    expect(textContents.some(t => t && t.toString().includes('2'))).toBe(true)
  })

  it('has Show Answer, Correct, and Incorrect buttons', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <Quiz navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const buttons = instance.findAllByType('Button')
    const buttonTitles = buttons.map(b => b.props.title)
    expect(buttonTitles).toContain('Show Answer')
    expect(buttonTitles).toContain('Correct')
    expect(buttonTitles).toContain('Incorrect')
  })

  it('toggles answer visibility when Show Answer is pressed', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <Quiz navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root

    let texts = instance.findAllByType('Text')
    let textContents = texts.map(t => t.props.children)
    expect(textContents).not.toContain('Yes')

    const showAnswerButton = instance.findAllByType('Button').find(b => b.props.title === 'Show Answer')
    act(() => {
      showAnswerButton.props.onPress()
    })

    texts = instance.findAllByType('Text')
    textContents = texts.map(t => t.props.children)
    expect(textContents).toContain('Yes')
  })
})
