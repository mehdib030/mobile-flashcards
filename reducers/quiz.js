import {SAVE_ANSWER} from '../actions/quiz'

export default function questions (state = {},action){
    switch(action.type){
       
        case SAVE_ANSWER:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    qidx:[action.qidx],
                    correct:[action.count]
                }
            }
       
        default:
            return state
    }

}