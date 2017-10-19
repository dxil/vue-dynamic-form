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
  let lang = ctx.request.query.language
  ctx.response.type = 'json'
  let schema = await Schema.find({})
  schema = JSON.parse(JSON.stringify(schema))
  let _schema = schema.map((e) => {
    if (e[lang + 'Label']) {
      e.label = e[lang + 'Label']
    }else if (e['cnLabel']) {
      e.label = e[lang + 'Label']
    }else {
      console.log('没有该语言/中文Label')
    }
    return e
  })
  console.log(_schema)
  _schema.push({
    type: 'submit',
    validateBeforeSubmit: true,
    onSubmit: `(data) => {
        this.submit(data)
        this.validate = !this.validate
        console.log(this.validate)
      }`
  })
  ctx.body = {
    fields: _schema
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