const mongoose = require('mongoose')
const swiper = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  img: String,
  newsId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'news'
  },
  status: {
    type: Number,
    default: 1
  },
  sort: {
    type: Number,
    default: 0
  },
},
{
  versionKey: false,
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
})

module.exports = mongoose.model('swiper',swiper)