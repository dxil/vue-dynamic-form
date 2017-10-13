const Schema =require( '../models/schema')
const Data =require( '../models/data')

exports.postForm = async (ctx, next) => {
  // ctx.body = {
  //
  // }
  console.log(ctx.request.body)
  ctx.body = {
    status: 0
  }
  let res = await Data.collection.remove()
  Data.collection.insert(ctx.request.body)
}

exports.getForm = async (ctx, next) => {
  // ctx.body = {
  //
  // }
  ctx.response.type = 'json'
  let schema = await Schema.find({})
  schema.push({
    type: 'submit',
    validateBeforeSubmit: true,
    onSubmit: `(data) => {
        this.submit(data)
        this.validate = !this.validate
        console.log(this.validate)
      }`
  })
  ctx.body = {
    fields: schema
  }
}

exports.getModel = async (ctx, next) => {
  // ctx.body = {
  //
  // }
  ctx.response.type = 'json'
  let data = await Data.findOne({})
  ctx.body = {
    model: data
  }
}