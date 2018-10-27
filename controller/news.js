const {Router} = require('express')
const router = Router()
const auth = require('../config/auth')
const newsModel = require('../model/news')

router.post('/', auth, async (req,res,next) => {
  try {
    let {
      title,
      content,
      contentText,
      img,
      author,
      type,
      look_nums
    } = req.body;

    const data = await newsModel.create({
      title,
      content,
      contentText,
      img,
      author,
      type,
      look_nums
    })

    res.json({
      code: 200,
      msg: '添加新闻成功',
      data
    })

  } catch (error) {
    next(error)
  }
})

router.get('/',async (req,res,next) => {
  try {
    let {page = 1,page_size = 10} = req.query;
    page = parseInt(page)
    page_size = parseInt(page_size)
    const dataList = await newsModel.find()
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({_id: 1})
      .populate({
        path:'author',
        select: '-password'
      })
      .populate({
        path: 'type'
      })

      res.json({
        code: 200,
        msg: '获取新闻成功',
        data: dataList
      })
  } catch (error) {
    next(error)
  }
})

router.get('/:id',async (req,res,next) => {
  try {
    const { id } = req.params
    const data = await newsModel.findById(id)
      .populate({
        path: 'author',
        select: '-password'
      })
      .populate({
        path: 'type'
      })

      res.json({
        code: 200,
        msg: '获取单条新闻成功',
        data
      })
  } catch (error) {
    next(error)
  }
})

router.delete('/:_id', auth,async (req,res,next) => {
  try {
    const { _id } = req.params
    const data = await newsModel.deleteOne({_id})
    res.json({
      code: 200,
      msg: '删除成功',
      data
    })
  } catch (error) {
    next(error)
  }
   
})

module.exports = router