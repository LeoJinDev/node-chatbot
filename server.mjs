import {ChatGPTAPI} from 'chatgpt'
import dotenv from 'dotenv-safe'
import express from 'express'
dotenv.config()

const app = express()

app.get('/', async (req, res) => {
  const quiz = req.query.quiz
  // sessionToken is required; see below for details
  const api = new ChatGPTAPI({
    sessionToken: process.env.SESSION_TOKEN
  })

  // ensure the API is properly authenticated
  await api.ensureAuth()

  // send a message and wait for the response
  const response = await api.sendMessage(
    quiz
  )

  res.status(200).send(response);
})

const port = process.env.port || 3088

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})