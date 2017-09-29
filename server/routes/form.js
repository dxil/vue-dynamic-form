const router = require('koa-router')()
const form = require('../app/controllers/form')

router.prefix('/forms')

router.post('/', form.postForm)


module.exports = router