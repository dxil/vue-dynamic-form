var mongoose = require('mongoose')
var mongooSchema = mongoose.Schema

var schema = new mongooSchema({
  type: String,
  label: String,
  inputType: String,
  model: String,
  values: Array,
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

module.exports = mongoose.model('Schema', schema)
