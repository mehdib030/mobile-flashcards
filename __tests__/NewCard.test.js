import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import NewCard from '../components/NewCard'
import rootReducer from '../reducers'

jest.mock('../utils/api', () => ({
  getDecks: jest.fn(() => Promise.resolve({})),
  saveAnswer: jest.fn(() => Promise.resolve()),
  saveDeck: jest.fn(() => Promise.resolve()),
  saveCard: jest.fn(() => Promise.resolve()),
}))

const mockDecks = {
  React: { title: 'React', questions: [], qidx: 0, correct: 0 },
}

function createTestStore() {
  return createStore(rootReducer, { decks: mockDecks }, applyMiddleware(thunk))
}

describe('NewCard', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    state: { params: { title: 'React' } },
  }

  it('renders without crashing', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <NewCard navigation={mockNavigation} />
      </Provider>
    )
    expect(tree.toJSON()).toBeTruthy()
  })

  it('displays New Card title', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <NewCard navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const texts = instance.findAllByType('Text')
    const textContents = texts.map(t => t.props.children)
    expect(textContents).toContain('New Card')
  })

  it('renders question and answer input fields', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <NewCard navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const inputs = instance.findAllByType('TextInput')
    expect(inputs.length).toBe(2)
    expect(inputs[0].props.placeholder).toBe('Enter question!')
    expect(inputs[1].props.placeholder).toBe('Enter answer!')
  })

  it('renders a Submit button', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <NewCard navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const button = instance.findByType('Button')
    expect(button.props.title).toBe('Submit')
  })

  it('updates question text on input change', () => {
    const store = createTestStore()
    const tree = renderer.create(
      <Provider store={store}>
        <NewCard navigation={mockNavigation} />
      </Provider>
    )
    const instance = tree.root
    const inputs = instance.findAllByType('TextInput')
    act(() => {
      inputs[0].props.onChangeText('Is React cool?')
    })
    const updatedInputs = instance.findAllByType('TextInput')
    expect(updatedInputs[0].props.value).toBe('Is React cool?')
  })
})
