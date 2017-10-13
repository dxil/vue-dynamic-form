const Schema =require( '../models/schema')

const requiredModel = {
  name: {
    type: 'input',
    inputType: 'text',
    label: '姓名',
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
    label: '年龄',
    model: 'age',
    readonly: false,
    featured: true,
    required: true,
    disabled: false,
  },
  account: {
    type: 'input',
    inputType: 'text',
    label: '账号',
    model: 'account',
    readonly: false,
    featured: true,
    required: true,
    disabled: false,
  },
  password: {
    type: 'input',
    inputType: 'password',
    label: '密码',
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