exports.postForm = async (ctx, next) => {
  // ctx.body = {
  //
  // }
  console.log(ctx.request.body)
  ctx.body = {
    a: '2'
  }
}

exports.getForm = async (ctx, next) => {
  // ctx.body = {
  //
  // }
  ctx.response.type = 'json'
  ctx.body = {
    fields: [{
      type: 'input',
      inputType: 'text',
      label: 'ID',
      model: 'id',
      readonly: true,
      featured: false,
      disabled: true
    }, {
      type: 'input',
      inputType: 'text',
      label: 'Name',
      model: 'name',
      readonly: false,
      featured: true,
      required: true,
      disabled: false,
      placeholder: 'User\'s name',
      // validator: `VueFormGenerator.validators.string`,
      onChanged: `(model, newVal, oldVal, field) => {
        console.log("Model's name changed from"+ oldVal + "to" + newVal);
        console.log(this.validate)
      }`,
    }, {
      type: 'input',
      inputType: 'password',
      label: 'Password',
      model: 'password',
      min: 6,
      required: true,
      hint: 'Minimum 6 characters',
    }, {
      type: 'input',
      inputType: 'email',
      label: 'E-mail',
      model: 'email',
      placeholder: 'User\'s e-mail address'
    }, {
      type: 'checklist',
      label: 'Skills',
      model: 'skills',
      multi: true,
      required: true,
      multiSelect: true,
      values: ['HTML5', 'Javascript', 'CSS3', 'CoffeeScript', 'AngularJS', 'ReactJS', 'VueJS']
    }, {
      type: 'switch',
      label: 'Status',
      model: 'status',
      multi: true,
      readonly: false,
      featured: false,
      disabled: false,
      default: true,
      textOn: 'Active',
      textOff: 'Inactive'
    },  {
      type: 'submit',
      validateBeforeSubmit: true,
      onSubmit: `(data) => {
        this.submit(data)
        this.validate = !this.validate
        console.log(this.validate)
      }`
    }]
  }
}
