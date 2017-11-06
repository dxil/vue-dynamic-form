import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Schema from '@/components/Schema'
import Form from '@/components/Form'
import Date from '@/components/Date'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/schema',
      name: 'Schema',
      component: Schema
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/date',
      name: 'Date',
      component: Date
    }
  ]
})
