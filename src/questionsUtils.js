import questionsData from './questions.json';

let getDetails = (sn) => {

    let details = []

    questionsData.questions.forEach((ques) => {
        details[ques.sn] = ques.info
    })

    return(details[sn])
}

export {
    getDetails
}