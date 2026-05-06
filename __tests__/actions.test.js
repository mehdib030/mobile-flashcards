import {
  GET_DECKS,
  SAVE_ANSWER,
  SAVE_DECK,
  SAVE_CARD,
  getDecks,
  saveAnswerAction,
  saveDeckAction,
  saveCardAction,
} from '../actions/decks'

describe('deck action creators', () => {
  it('getDecks creates the correct action', () => {
    const decks = { React: { title: 'React', questions: [] } }
    expect(getDecks(decks)).toEqual({
      type: GET_DECKS,
      decks,
    })
  })

  it('saveDeckAction creates the correct action', () => {
    expect(saveDeckAction({ title: 'NewDeck' })).toEqual({
      type: SAVE_DECK,
      title: 'NewDeck',
    })
  })

  it('saveCardAction creates the correct action', () => {
    expect(saveCardAction({ title: 'React', question: 'Q?', answer: 'A' })).toEqual({
      type: SAVE_CARD,
      title: 'React',
      question: 'Q?',
      answer: 'A',
    })
  })

  it('saveAnswerAction creates the correct action', () => {
    expect(saveAnswerAction({ title: 'React', qidx: 1, correct: 1 })).toEqual({
      type: SAVE_ANSWER,
      title: 'React',
      qidx: 1,
      correct: 1,
    })
  })
})
