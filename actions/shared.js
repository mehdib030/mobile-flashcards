import {getInitialData} from '../utils/api'
import {getDecks} from './decks'

export function handleInitialData(){
    return (dispatch) => {
        return getInitialData().then(({decks}) => {
            dispatch(getDecks(decks))
        })
    }
}