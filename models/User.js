import mongoose from "mongoose"
import bcrypt from "bcrypt"

const saltRounds = 10

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
})

// pre: user 스키마에 데이터를 저장하기(몽구스의 save 메소드 실행) 전에 실행하는 메소드
userSchema.pre('save', function (next) {
  let user = this
  console.log('function에서 this: ', user)

  if (user.isModified('password')) {
    console.log('isModified 메소드 실행됨')
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  }
})

export const User = mongoose.model('User', userSchema);