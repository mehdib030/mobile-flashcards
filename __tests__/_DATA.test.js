import { _getDecks, _saveDeck, _saveCard } from '../utils/_DATA'

describe('_DATA utility', () => {
  it('_getDecks returns decks object', async () => {
    const decks = await _getDecks()
    expect(decks).toBeTruthy()
    expect(decks.React).toBeTruthy()
    expect(decks.JavaScript).toBeTruthy()
  })

  it('_getDecks returns decks with expected structure', async () => {
    const decks = await _getDecks()
    expect(decks.React.title).toBe('React')
    expect(Array.isArray(decks.React.questions)).toBe(true)
    expect(decks.React.questions.length).toBeGreaterThan(0)
  })

  it('_saveDeck adds a new deck', async () => {
    await _saveDeck({ title: 'TestDeck' })
    const decks = await _getDecks()
    expect(decks.TestDeck).toBeTruthy()
    expect(decks.TestDeck.title).toBe('TestDeck')
    expect(decks.TestDeck.questions).toEqual([])
  })

  it('_saveCard adds a card to an existing deck', async () => {
    await _saveCard({ title: 'TestDeck', question: 'Test Q?', answer: 'Test A' })
    const decks = await _getDecks()
    expect(decks.TestDeck.questions.length).toBe(1)
    expect(decks.TestDeck.questions[0].question).toBe('Test Q?')
  })
})
