<template>
  <div class="container">
    <div style="margin-bottom: 10px">
      <el-checkbox-group
        v-model="checkedAttrs">
        <el-checkbox v-for="attr in attrs" :label="attr.value" :key="attr.name" :disabled = "attr.disabled">{{attr.name}}</el-checkbox>
      </el-checkbox-group>
    </div>

    <el-button type="primary" @click="add" size="small" style="margin-bottom: 10px">自建模块</el-button>

    <el-select v-model="languageType" style="margin-bottom: 10px">
      <el-option
        v-for="item in languageOpts"
        :key="item.type"
        :label="item.type"
        :value="item.value">
      </el-option>
    </el-select>

    <el-form v-for = "(schema, index) in schemas" :key="index" style="margin-bottom: 10px">

      <el-form-item :label="modelName">
        <el-input v-model="schema[languageType + 'Label']" style="width: 192px"></el-input>
      </el-form-item>

      <el-form-item label="模块唯一标识">
        <el-input v-model="schema.model" placeholder="英文" style="width: 192px"></el-input>
      </el-form-item>

      <el-form-item label="选择模块类型">
        <el-select v-model="schema.type" style="margin-bottom: 10px">
          <el-option
            v-for="item in typeOpts"
            :key="item.type"
            :label="item.label"
            :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="schema.type === 'input'" label="输入框类型">
        <el-select v-model="schema.inputType" style="margin-bottom: 10px">
          <el-option
            v-for="item in typeInpOpts"
            :key="item.type"
            :label="item.label"
            :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="schema.type === 'checklist'" label="多选框可选择值">
        <div>
          <el-input style="width: 192px" v-model="multiInpValue"></el-input>
          <el-button @click="addMultiCheckList(index)">添加</el-button>
        </div>
        <ul class="container">
          <li v-for="value in schema.values">{{value}}</li>
        </ul>
      </el-form-item>

      <el-form-item v-if="schema.type === 'select'" label="单选框可选择值">
        <div>
          <el-input style="width: 192px" v-model="inpValue"></el-input>
          <el-button @click="addCheckList(index)">添加</el-button>
        </div>
        <ul class="container">
          <li v-for="value in schema.values">{{value}}</li>
        </ul>
      </el-form-item>

    </el-form>
    <el-button v-if="schemas.length" @click="postSchema">确定</el-button>
    <hr>
    <div v-for="schema in schemas">
      <span>{{schema}}</span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  const attrOptions = [
    {
      name: '姓名',
      value: 'name',
      disabled: true
    },
    {
      name: '年龄',
      value: 'age',
      disabled: true
    },
    {
      name: '账号',
      value: 'account'
    },
    {
      name: '密码',
      value: 'password'
    }
  ]
  const languageOptions = [
    {
      type: '中文',
      value: 'cn'
    },
    {
      type: '英语',
      value: 'en'
    }]
  const typeOptions = [
    {
      type: 'input',
      label: '输入框'
    },
    {
      type: 'checklist',
      label: '多选框'
    },
    {
      type: 'select',
      label: '单选框'
    },
    {
      type: 'image',
      label: '图片上传'
    }
  ]
  const typeInpOptions = [
    {
      type: 'text',
      label: '文本'
    },
    {
      type: 'password',
      label: '密码'
    },
    {
      type: 'email',
      label: '邮箱'
    },
    {
      type: 'number',
      label: '数值'
    },
    {
      type: 'file',
      label: '文件上传'
    }
  ]
  export default {
    data () {
      return {
        checkedAttrs: ['name', 'age'],
        attrs: attrOptions,
        typeOpts: typeOptions,
        typeInpOpts: typeInpOptions,
        languageOpts: languageOptions,
        languageType: 'cn',
//        modelName: '',
        multiInpValue: '',
//        label: '',
        inpValue: '',
        schemas: []
      }
    },
    computed: {
      modelName: function () {
        for (let i = 0; i < languageOptions.length; i++) {
          if (languageOptions[i].value === this.languageType) {
            return languageOptions[i].type + '模板名称'
          }
        }
      }
    },
    methods: {
      submit () {
        console.log(this.checkedAttrs)
      },
      add () {
        this.schemas.push({type: '', cnLabel: '', enLabel: '', inputType: '', model: ''})
      },
      addMultiCheckList (i) {
        if (!this.schemas[i].values && this.schemas[i].type === 'checklist') {
          this.schemas[i].values = []
        }
        this.schemas[i].values.push(this.multiInpValue)
        this.multiInpValue = ''
      },
      addCheckList (i) {
        if (!this.schemas[i].values && this.schemas[i].type === 'select') {
          this.schemas[i].values = []
        }
        this.schemas[i].values.push(this.inpValue)
        this.inpValue = ''
      },
      postSchema: async function () {
        let response = await axios.request({
          method: 'post',
          url: 'http://localhost:3000/schema',
          data: {
            schemas: this.schemas,
            checkedAttrs: this.checkedAttrs
          }
        })
        console.log(response)
      }
    }
  }
</script>

<style>
  form {
    border: 1px solid #bfcbd9;
    padding: 20px;
  }
  .container {
    padding: 10px;
  }
</style>
