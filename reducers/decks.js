import {GET_DECKS,SAVE_ANSWER,SAVE_DECK,SAVE_CARD} from '../actions/decks'

export default function (state = {},action){

    switch(action.type){
        case GET_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case SAVE_ANSWER:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    qidx:action.qidx,
                    correct:action.correct,
                    
                }
            }

            case SAVE_DECK:
                return {
                    ...state,
                    [action.title]: {
                        ...state[action.title],
                        title:action.title,
                        questions:[],
                        qidx:0,
                        correct:0,
                        
                    }
                }

            case SAVE_CARD:
                return {
                    ...state,
                    [action.title]: {
                        ...state[action.title],
                        questions: [...state[action.title].questions, {question:action.question,answer:action.answer}]
                    }
                }
         default:
             return state   

    }
}