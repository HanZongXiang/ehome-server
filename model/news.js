const mongoose = require('mongoose')

const news = new mongoose.Schema({
  title: String,
  content: {
    type: String,
    required: true
  },
  contentText: String,
  img: String,
  author: {
    type:mongoose.SchemaTypes.ObjectId,
    ref: 'adminUser'
  },
  type: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'category'
  },
  look_nums: {
    type: Number,
    default: 0
  }
},
{
  versionKey:false,
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
})

module.exports = mongoose.model('news',news)