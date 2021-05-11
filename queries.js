const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'questions_answers',
  password: 'password',
  port: 5432,
})

const getQuestionsByProductID = async (product_id, callback) => {
  const queryString = `SELECT * FROM questions WHERE product_id = ${product_id}`
  var questions
  try{
    const res = await pool.query(queryString)
    var questions = res.rows
    for (var i = 0;  i < questions.length; i++){
      questions[i].answers = await getAnswersByQuestionID(questions[i].question_id)
    }
    var returnObj = {
      "product_id": product_id,
      results: questions
    }
    callback(returnObj)
  }
  catch(e){
    return "err"
  }
};

const getPhotosByAnswerID = async (answer_id, callback) => {
  const queryString = `select * from answers_photos where answer_id = ${answer_id}`
  try {
    const res = await pool.query(queryString)
    return res.rows
  }
  catch (e) {
    return "err"
  }
}

const getAnswersByQuestionID = async (question_id, callback) => {
var answers;
var photos;
 const query = `SELECT * FROM answers WHERE question_id = ${question_id}`
  try {
    var res = await pool.query(query)
    var answers = res.rows
    for (var i = 0; i < answers.length; i++){
      answers[i].photos = await getPhotosByAnswerID(answers[i].answer_id)
    }
    return answers
    callback(answers)
  }
  catch (e) {
    return "err"
  }
};

const addQuestionsByProductID = (question, callback) => {
  const queryString = `INSERT INTO questions (question_id, product_id, q_body, asker_name, asker_email) values (nextval('qid'), '${question.product_id}', '${question.question}', '${question.name}', '${question.email}')`;
  pool.query(queryString, (err, response) => {
    console.log('queryString', queryString)
    if(err){
      console.log(err)
    } else {
      callback(response)
    }
  })
};

const markQuestionHelpful = (question_id, callback) => {
  const queryString = `update questions set q_helpful = q_helpful + 1 where question_id = ${question_id}`
  pool.query(queryString, (err, response) => {
    if(err) console.log(err)
    else {
      callback(response)
    }
  })
}

const reportQuestion = (question_id, callback) => {
  const queryString = `update questions set q_reported = 1 where question_id = ${question_id}`
  pool.query(queryString, (err, response) => {
    if(err) console.log(err)
    else {
      callback(response)
    }
  })
}

const markAnswerHelpful = (answer_id, callback) => {
  const queryString= `update answers set a_helpful = a_helpful + 1 where answer_id = ${answer_id}`
  pool.query(queryString, (err, response) => {
    if(err) console.log(err)
    else {
      callback(response)
    }
  })
}

const reportAnswer = (answer_id, callback) => {
  const queryString = `update answers set a_reported = 1 where answer_id = ${answer_id}`
  pool.query(queryString, (err, response) => {
    if(err) console.log(err)
    else {
      callback(response)
    }
  })
}

const addAnswerbyQuestionID = async (answerObj) => {
  const newID = answerObj.answer_id + 1
  const queryStringA = `insert into answers(answer_id, question_id, answer_body, answerer_name, answerer_email) values('${newID}', '${answerObj.question_id}', '${answerObj.body}', '${answerObj.name}', '${answerObj.email}')`
  try {
    console.log('string', queryStringA)
    var res = await pool.query(queryStringA)
    var res1 = await addPhotosByAnswerID(answerObj)
    return res1
  }
  catch(e) {
    console.log(e)
  }
}

const addPhotosByAnswerID = async (answerObj) => {
  const newID = answerObj.answer_id + 1
  const queryString = `insert into answers_photos(id, answer_id, photo_url) values(nextval('pid'), '${newID}', '${answerObj.photos[0]}')`
  try {
    var res = await pool.query(queryString)
    return res
  }
  catch(e){
    console.log(e)
  }
}

const getLastAnswerID = async () => {
  var res = await pool.query('select answer_id from answers order by answer_id desc limit 1')
  return res.rows
}

module.exports = {
  getQuestionsByProductID,
  getAnswersByQuestionID,
  addQuestionsByProductID,
  markQuestionHelpful,
  reportQuestion,
  markAnswerHelpful,
  reportAnswer,
  addAnswerbyQuestionID,
  getLastAnswerID,
}


