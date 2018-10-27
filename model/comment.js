const mongoose = require('mongoose')

const comment = new mongoose.Schema({
  content: String,
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'adminUser'
  },
  topic: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'topic'
  }
},
{
  versionKey: false,
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
})

module.exports = mongoose.model('comment',comment)