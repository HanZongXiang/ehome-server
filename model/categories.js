const mongoose = require('mongoose')

const category = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=8135601,2316906095&fm=27&gp=0.jpg' 
  }
},
{
  versionKey:false,
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
})

module.exports = mongoose.model('category',category)