import {saveAnswer,saveDeck,saveCard }from '../utils/api'
export const GET_DECKS = 'GET_DECKS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const SAVE_DECK = 'SAVE_DECK'
export const SAVE_CARD = 'SAVE_CARD'

export function handleSaveAnswer(title,qidx,correct){
    return (dispatch,getState) => {

        return saveAnswer({
            title:title,
            qidx:qidx,
            correct: correct,
        }).then(() => {
            dispatch(saveAnswerAction({title,qidx,correct}))
        })
        
    }
}

export function handleSaveDeck(title){
    return (dispatch,getState) => {

        return saveDeck({
            title:title
        }).then(() => {
            dispatch(saveDeckAction({title}))
        })
        
    }
}

export function handleSaveCard(title,question,answer){
    return (dispatch,getState) => {

        return saveCard({
            title:title,
            question:question,
            answer:answer
        }).then(() => {
            dispatch(saveCardAction({title,question,answer}))
        })
        
    }
}

export function saveDeckAction({title}){
    return {
        type:SAVE_DECK,
        title
    }
}

export function saveCardAction({title,question,answer}){
    return {
        type:SAVE_CARD,
        title,
        question:question,
        answer:answer
    }
}

export function saveAnswerAction({title,qidx,correct}){
    return {
        type:SAVE_ANSWER,
        title,
        qidx,
        correct,
    }
}

export function getDecks(decks){
    return {
        type:GET_DECKS,
        decks
    }
}
