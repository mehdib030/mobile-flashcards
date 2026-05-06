import decksReducer from '../reducers/decks'
import quizReducer from '../reducers/quiz'
import { GET_DECKS, SAVE_ANSWER, SAVE_DECK, SAVE_CARD } from '../actions/decks'
import { SAVE_ANSWER as QUIZ_SAVE_ANSWER } from '../actions/quiz'

describe('decks reducer', () => {
  it('returns the initial state', () => {
    expect(decksReducer(undefined, {})).toEqual({})
  })

  it('handles GET_DECKS', () => {
    const decks = {
      React: { title: 'React', questions: [], qidx: 0, correct: 0 },
    }
    const action = { type: GET_DECKS, decks }
    expect(decksReducer({}, action)).toEqual(decks)
  })

  it('handles SAVE_DECK', () => {
    const action = { type: SAVE_DECK, title: 'NewDeck' }
    const result = decksReducer({}, action)
    expect(result.NewDeck).toEqual({
      title: 'NewDeck',
      questions: [],
      qidx: 0,
      correct: 0,
    })
  })

  it('handles SAVE_CARD', () => {
    const initialState = {
      React: { title: 'React', questions: [], qidx: 0, correct: 0 },
    }
    const action = {
      type: SAVE_CARD,
      title: 'React',
      question: 'Is React fast?',
      answer: 'Yes',
    }
    const result = decksReducer(initialState, action)
    expect(result.React.questions).toEqual([
      { question: 'Is React fast?', answer: 'Yes' },
    ])
  })

  it('handles SAVE_ANSWER', () => {
    const initialState = {
      React: { title: 'React', questions: [{ question: 'Q?', answer: 'A' }], qidx: 0, correct: 0 },
    }
    const action = { type: SAVE_ANSWER, title: 'React', qidx: 1, correct: 1 }
    const result = decksReducer(initialState, action)
    expect(result.React.qidx).toBe(1)
    expect(result.React.correct).toBe(1)
  })

  it('preserves existing decks when adding a new one', () => {
    const initialState = {
      React: { title: 'React', questions: [], qidx: 0, correct: 0 },
    }
    const action = { type: SAVE_DECK, title: 'JavaScript' }
    const result = decksReducer(initialState, action)
    expect(result.React).toBeTruthy()
    expect(result.JavaScript).toBeTruthy()
  })
})

describe('quiz reducer', () => {
  it('returns the initial state', () => {
    expect(quizReducer(undefined, {})).toEqual({})
  })

  it('handles SAVE_ANSWER', () => {
    const action = { type: QUIZ_SAVE_ANSWER, title: 'React', qidx: 1, count: 1 }
    const result = quizReducer({}, action)
    expect(result.React).toEqual({ qidx: [1], correct: [1] })
  })
})
