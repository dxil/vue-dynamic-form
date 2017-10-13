var mongoose = require('mongoose')
var mongooSchema = mongoose.Schema

var data = new mongooSchema({
  model: Object,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

module.exports = mongoose.model('Data', data)
