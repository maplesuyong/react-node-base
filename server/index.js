import express from 'express'
import mongoose from 'mongoose'
import { User } from './models/User.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { auth } from './middleware/auth.js'

import cors from 'cors';

const app = express()
const PORT = 5000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors());

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://root:1q2w3e4r@react-node.pzbh1qm.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('몽고디비 연결 성공!'))
  .catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send(`Hello world! 서버포트 ${PORT}에서 send로 보낸 데이터입니다!`)
})

app.get('/hello', (req, res) => {
  res.send("하이요~")
})

app.post('/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, userInfo) => {
    console.log(userInfo)
    if(err) {
      return res.json({ success: false, err })
    }
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login', (req, res) => {
  // 요청된 이메일이 DB에 있는지 먼저 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log('여기서 안되는거임')
    }
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "입력된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 요청된 이메일이 DB에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        console.log('여기서 안되는거임')
      }
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
      }

      user.generateToken((err, user) => {
        if (err) {
          console.log('여기서 안되는거임')
        }
        if (err) return res.status(400).send(err)

        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

app.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false: true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).send({
      success: true
    })
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})