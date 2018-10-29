const mongoose = require('mongoose')
const adminUser = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  nickname: String,
  avatar: String,
  password: {
    type:String,
    required: true
  },
  jobRank: Number,
  phone: Number,
  sex: Number,
  desc: String,
  hometown: String,
  workAddress: String
},{
  versionKey: false,
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
})

module.exports = mongoose.model('adminUser',adminUser)