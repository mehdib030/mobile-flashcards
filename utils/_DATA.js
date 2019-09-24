/* let decks = {
    deck1:{
        id:'deck1',
        title:'Sports',
        cards:['card1','card2','card3'],
        correct:['card1'],
        incorrect:['card2','card3']
    },
    deck2:{
        id:'deck2',
        title:'Tech',
        cards:['card4','card5'],
        correct:['card5'],
        incorrect:['card4']
    }
}

let cards = {
    card1:{
        id:'card1',
        title:"US Open Men",
        question:"Is Nadal the favorite to win the men's Us Open?",
        answer:'No'
    },
    card2:{
        id:'card2',
        title:'US Open Women',
        question:"Is Serna Williams the favorite to win the women's Us Open?",
        answer:'Yes'
    },
    card3:{
        id:'card3',
        title:"Foootbal Season 2019",
        question:"Are the Vikings going to win the Super Bowl",
        answer:'No'
    },
    card4:{
        id:'card4',
        title:'Cyber Security',
        question:"Are fortune 500 companies doing enough to combat cyber attacks?",
        answer:'No'
    },
    card5:{
        id:'card5',
        title:"titleText",
        question:"Is React the future of fron end development?",
        answer:'Yes'
    }
} */

let decks = {
    React: {
        title: 'React',
        questions: [
          {
            question: 'Is React Javascript based?',
            answer: 'Yes'
          },
          {
            question: 'Is IOS React native deployment hassle free ?',
            answer: 'No'
          }
        ],
        qidx:0,
        correct:0
      },
    JavaScript: {
        title: 'JavaScript',
        questions: [
          {
            question: 'Is javascript single threaded?',
            answer: 'Yes'
          }
        ],
        qidx:0,
        correct:0
      }
}
export function _getDecks(){
    return new Promise((res,rej) => {
        setTimeout(() => res({...decks}), 1000)
    })
}

export function _getDeck(id){
    return new Promise((res,rej)=>{
        setTimeout(() => res({...cards[id]}), 1000)
    })
}

export function _saveDeckTitle(title){
}

export function _addCardToDeck(title, card){

}

export function _saveDeck({title}){
  return new Promise((res, rej) => {
    setTimeout(() => {
      decks = {
        ...decks,
        [title] : {
            title:title,
            qidx: 0,
            correct:0,
            questions:[]
        }
      }
      res()
    }, 500)
  })
}

export function _getCards(){
    return new Promise((res,rej) => {
        setTimeout(() => res({...cards}), 1000)
    })
}

export function _getCard(id){
    return new Promise((res,rej)=>{
        setTimeout(() => res({...cards[id]}), 1000)
    })
}

export function _saveCard({title,question,answer}){
  console.log('TITLE = ',title)
  console.log('QUESTION', question)
  console.log('ANSWER = ',answer)
  // decks1 = {
  
  //     ...decks,
  //     [title]:{
  //       questions: decks[title].questions.concat({question:question,answer:answer})
  //     }
      
      
  //     //:questions.concat({question:question,answer:answer}),
  //       //questions.concat({question:question,answer:answer})
  //   }
   
  //console.log('STATE2',decks1)
  return new Promise((res, rej) => {
    setTimeout(() => {
      decks = {
  
        ...decks,
        [title]:{
          questions: decks[title].questions.concat({question:question,answer:answer})
        }
      }
      res()
    }, 500)
  })
}

export function _saveAnswer ({ title,qidx, count }) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        decks = {
          ...decks,
          [title] : {
              qidx: qidx,
              correct:count
          }
        }
  
        res()
      }, 500)
    })
  }

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}