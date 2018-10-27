const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/e_home', { useNewUrlParser:true } )
const connection = mongoose.connection
connection.on('open', () => {
  console.log('connected successfully')
})

module.exports = connection