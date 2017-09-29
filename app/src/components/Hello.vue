<template>
  <div>
    <h1 class="text-center">Demo of vue-form-generator</h1>
    <div class="container" id="app">
      <div class="panel panel-default">
        <div class="panel-heading">Form</div>
        <div class="panel-body">
          <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
        </div>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading">Model</div>
        <div class="panel-body">
          <pre v-if="model" v-html="prettyJSON(model)"></pre>
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
  export default {

    data () {
      return {
        test: 1,
        model: {
          id: 1,
          name: 'John Doe',
          password: 'J0hnD03!x4',
          age: 35,
          skills: ['Javascript', 'VueJS'],
          email: 'john.doe@gmail.com',
          status: true
        },
        schema: {
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
            validator: VueFormGenerator.validators.string
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
        },

        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true
        }
      }
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
      }
    }
  }

  /* eslint-enable */
</script>
