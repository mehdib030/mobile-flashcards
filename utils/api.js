import {
    _getDecks,
    _saveAnswer,
    _saveDeck,
    _saveCard
} from './_DATA.js'

export function getInitialData(){
    return Promise.all([_getDecks()]).then(([decks])=> ({
        decks
    }))
}

export function getDecks(){
    return getDecks()
}

export function saveAnswer({title,qidx,correct}){
    return _saveAnswer({title,qidx,correct})
}

export function saveDeck({title}){
    return _saveDeck({title})
}

export function saveCard({title,question,answer}){
    return _saveCard({title,question,answer})
}