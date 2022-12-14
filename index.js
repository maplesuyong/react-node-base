import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = 5000

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://root:1q2w3e4r@react-node.pzbh1qm.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('몽고디비 연결 성공!'))
  .catch((err) => console.log(err))

app.get('/', (req, res) => res.send('Hello world!'))

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})