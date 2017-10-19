const Schema =require( '../models/schema')

const requiredModel = {
  name: {
    type: 'input',
    inputType: 'text',
    cnLabel: '姓名',
    enLabel: 'name',
    model: 'name',
    readonly: false,
    featured: true,
    required: true,
    disabled: false,
    placeholder: 'User\'s name',
  },
  age: {
    type: 'input',
    inputType: 'number',
    cnLabel: '年龄',
    enLabel: 'age',
    model: 'age',
    readonly: false,
    featured: true,
    required: true,
    disabled: false,
  },
  account: {
    type: 'input',
    inputType: 'text',
    cnLabel: '账号',
    enLabel: 'account',
    model: 'account',
    readonly: false,
    featured: true,
    required: true,
    disabled: false,
  },
  password: {
    type: 'input',
    inputType: 'password',
    cnLabel: '密码',
    enLabel: 'password',
    model: 'password',
    readonly: false,
    featured: true,
    required: true,
    disabled: false,
  },
}

exports.postSchema = async (ctx, next) => {
  // ctx.body = {
  //
  // }
  console.log(ctx.request.body)
  let data = ctx.request.body
  ctx.body = {
    status: 0
  }
  let res = await Schema.collection.remove()
  data.checkedAttrs.forEach((attr) => {
    if (!!requiredModel[attr]) {
      Schema.collection.insert(requiredModel[attr])
    }
  })
  data.schemas.forEach((schema) => {
    Schema.collection.insert(schema)
  })

}