import questionsData from './questions.json';

let getDetails = (sn) => {

    let details = []

    questionsData.questions.forEach((ques) => {
        details[ques.sn] = ques.info
    })

    return(details[sn])
}

let getRole = (score) => {

    let role

    console.log(score)

    if (score[2] == 1) {
        role = questionsData.roles[4]
    } else {
        if (score[0] >= 6) { //本土語言者
            if (score[1] >= 3) { //行動者
                role = questionsData.roles[1]
            } else {
                role = questionsData.roles[0]
            }
        } else {
            if (score[1] >= 3) {
                role = questionsData.roles[3]
            } else {
                role = questionsData.roles[2]
            }
        }
    }

    return({
        roleName: role.title,
        roleDescription: role.description
    })
}

export {
    getDetails,
    getRole
}