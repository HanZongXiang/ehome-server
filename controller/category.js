const {Router} = require('express')
const router = Router()
const categoryModel = require('../model/categories')

router.post('/',async (req,res,next) => {
  try {
    const {title} = req.body
    const data = await categoryModel.create({
      title
    })
    res.json({
      code: 200,
      msg: '分类信息添加成功',
      data
    })
  } catch (error) {
    next(error)
  }
})

router.get('/',async (req,res,next) => {
  try {
    let {page = 1,page_size = 10} = req.query
    const data = await categoryModel.find()
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({_id: -1})

    res.json({
      code: 200,
      msg: '分类获取成功',
      data
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router