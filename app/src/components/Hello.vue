<template>
  <div>
    <h1 class="text-center">vue-form-generator</h1>
    <div class="container" id="app">
      <div class="panel panel-default">
        <div class="panel-heading">Form</div>
        <el-select v-model="languageType" style="margin-bottom: 10px" @change="getSchema">
          <el-option
            v-for="item in languageOpts"
            :key="item.type"
            :label="item.type"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="panel-body">
          <!--<field-upload-->
            <!--ref="upload"-->
            <!--post-action="/post.method"-->
            <!--put-action="/put.method"-->
          <!--&gt;</field-upload>-->
          <vue-form-generator :schema="schema" :model="model" :options="formOptions" @validated="onValidated"></vue-form-generator>

        </div>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading">Schema</div>
        <div class="panel-body">
          <pre v-if="model" v-html="prettyJSON(schema)"></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import VueFormGenerator from 'vue-form-generator'
  import VueUploadComponent from 'vue-upload-component/dist/vue-upload-component.part.js'
  import axios from 'axios';
  const schema_string = `{ fields: [{ type: 'input', inputType: 'text', label: 'ID', model: 'id', readonly: true, featured: false, disabled: true }, { type: 'input', inputType: 'text', label: 'Name', model: 'name', readonly: false, featured: true, required: true, disabled: false, placeholder: 'User\'s name', validator: VueFormGenerator.validators.string, onChanged: (model, newVal, oldVal, field) => { console.log(model); // console.log(this.prettyJSON) }, }, { type: 'input', inputType: 'password', label: 'Password', model: 'password', min: 6, required: true, hint: 'Minimum 6 characters', validator: VueFormGenerator.validators.string }, { type: 'input', inputType: 'email', label: 'E-mail', model: 'email', placeholder: 'User\'s e-mail address', validator: VueFormGenerator.validators.email }, { type: 'checklist', label: 'Skills', model: 'skills', multi: true, required: true, multiSelect: true, values: ['HTML5', 'Javascript', 'CSS3', 'CoffeeScript', 'AngularJS', 'ReactJS', 'VueJS'] }, { type: 'switch', label: 'Status', model: 'status', multi: true, readonly: false, featured: false, disabled: false, default: true, textOn: 'Active', textOff: 'Inactive' }], groups: [ { legend: "User Details", fields: [ { type: "input", inputType: "number", id: "current_age", label: "Age", model: "age" } ] } ] }`
  const languageOptions = [
    {
      type: '中文',
      value: 'cn'
    },
    {
      type: '英语',
      value: 'en'
    }]
  const schema = {
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
      validator: VueFormGenerator.validators.string,
      onChanged: (model, newVal, oldVal, field) => {
        console.log(`Model's name changed from ${oldVal} to ${newVal}. Model:`, model);
//              console.log(this.prettyJSON)
      },
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
      placeholder: 'User\'s e-mail address',
      validator: VueFormGenerator.validators.email
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
    }, {
      type: 'submit',
      label: '提交',
      validateBeforeSubmit: true,
      onSubmit: (data) => {
        this.submit(data)
      }
    }],
    groups: [
      {
        legend: "User Details",
        fields: [
          {
            type: "input",
            inputType: "number",
            id: "current_age",
            label: "Age",
            model: "age"
          }
        ]
      }
    ]
  }
  export default {

    data () {
      return {
        test: 1,
        validate: true,
        model: {
          file: ''
        },
        schema: {},
        languageOpts: languageOptions,
        languageType: 'cn',
        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true
        }
      }
    },
    components: {
      fieldUpload: VueUploadComponent
    },
    created () {
      this.getSchema()
    },
    methods: {
      prettyJSON: function (json) {
        if (json) {
          json = JSON.stringify(json, undefined, 4)
          json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')
          return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number'
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = 'key'
              } else {
                cls = 'string'
              }
            } else if (/true|false/.test(match)) {
              cls = 'boolean'
            } else if (/null/.test(match)) {
              cls = 'null'
            }
            return '<span class="' + cls + '">' + match + '</span>'
          })
        }
      },
      submit: async function (data) {
        let response = await axios.request({
          method: 'post',
          url: 'http://localhost:3000/forms',
          data: data
        })
        console.log(response)
      },
      getSchema: async function () {
        let response = await axios.request({
          method: 'get',
          url: `http://localhost:3000/forms?language=${this.languageType}`
        })
        console.log(response)
        response.data.fields[response.data.fields.length-1].onSubmit = eval(response.data.fields[response.data.fields.length-1].onSubmit)
        this.schema = response.data
        console.log(this.schema)
      },
      onValidated(isValid, errors) {
        console.log("Validation result: ", isValid, ", Errors:", errors);
      }
    }
  }

  /* eslint-enable */
</script>
