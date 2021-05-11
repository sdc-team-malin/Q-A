const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries.js')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/qa/questions', function(req, res) {
  const { product_id } = req.query
  db.getQuestionsByProductID(product_id, (results) => {
  res.send(results)
  })
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  const{ question_id } = req.params
  db.getAnswersByQuestionID(question_id, (results) => {
    res.send(results)
  })
})
app.post('/qa/questions', (req, res) => {
  const questionObj = req.body
  db.addQuestionsByProductID(questionObj, (results) => {
    res.status(200).send('Complete')
  })
})
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const { question_id } = req.params
  db.markQuestionHelpful(question_id, (results) => {
    res.status(204).send()
  })
})
app.put('/qa/questions/:question_id/report', (req, res) => {
  const { question_id } = req.params
  db.reportQuestion(question_id, (results) => {
    res.status(204).send()
  })
})
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const { answer_id } = req.params
  db.markAnswerHelpful(answer_id, (results) => {
    res.status(204).send()
  })
})
app.put('/qa/answers/:answer_id/report', (req, res) => {
  const { answer_id } = req.params
  db.reportAnswer(answer_id, (results) => {
    res.status(204).send()
  })
})
app.post('/qa/questions/:question_id/answers', async (req, res) => {
    try {
      const answerObj = req.body
      var res2 = await db.getLastAnswerID()
        answerObj.answer_id = res2[0].answer_id
      var res1 = await db.addAnswerbyQuestionID(answerObj)
      res.status(201).send("complete")
    }
    catch (e) {
      console.log(e)
    }
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
