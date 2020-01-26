import {saveAnswer} from '../utils/api'
export const SAVE_ANSWER = 'SAVE_ANSWER'

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

export function saveAnswerAction({title,qidx,correct}){
    return {
        type:SAVE_ANSWER,
        title,
        qidx,
        correct,
    }
}