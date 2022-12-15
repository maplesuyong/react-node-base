import express from 'express'
import mongoose from 'mongoose'
import { User } from './models/User.js'
import bodyParser from 'body-parser'

const app = express()
const PORT = 5000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://root:1q2w3e4r@react-node.pzbh1qm.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('몽고디비 연결 성공!'))
  .catch((err) => console.log(err))

app.get('/', (req, res) => res.send('Hello world!'))

app.post('/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) {
      return res.json({ success: false, err })
    }
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})