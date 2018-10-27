const mongoose = require('mongoose')

const topic = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'adminUser'
  },
  content: {
    type: String,
    required: true
  },
  comment: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'comment'
    }
  ]
},
{
  versionKey: false,
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
})

module.exports = mongoose.model('topic',topic)