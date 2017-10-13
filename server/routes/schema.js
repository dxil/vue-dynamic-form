const router = require('koa-router')()
const schema = require('../app/controllers/schema')

router.prefix('/schema')

router.post('/', schema.postSchema)


module.exports = router