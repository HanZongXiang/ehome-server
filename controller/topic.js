const {Router} = require('express')
const router = Router()
const auth = require('../config/auth')
const topicModel = require('../model/topic')

router.post('/', auth, async (req,res,next) => {
  try {
    const {content} = req.body;
    const userId = req.session.user._id

    const data = await topicModel.create({
      content,
      user: userId
    })

    res.json({
      code: 200,
      msg: '添加互动主题成功',
      data
    })
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req,res,next) => {
  try {
    let {page = 1,page_size = 10} = req.query
    page = parseInt(page)
    page_size = parseInt(page_size)

    let count = await topicModel.count()
    const dataList = await topicModel.find()
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({_id: 1})
      .populate({
        path: 'user',
        select: 'username avatar'
      })
      .populate({
        path: 'comment',
        select: 'content'
      })

      res.json({
        code: 200,
        msg: '请求成功',
        data: dataList,
        count
      })
  } catch (error) {
    next(error)
  }
})

router.get('/:_id',async (req,res,next) => {
  try {
    const {_id} = req.params
    const data = await topicModel.findById({_id})
      .populate({
        path: 'user',
        select: 'username avatar'
      })
      .populate({
        path: 'comment',
        select: 'content'
      })
    res.json({
      code: 200,
      msg: '获取单条评论主题成功',
      data
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/', auth, async (req, res, next) => {
  try {
    const { id } = req.query
    const data = await topicModel.deleteOne({ _id: id })
    res.json({
      code: 200,
      msg: '删除互动主题成功',
      data
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', auth ,async (req,res,next) => {
  try {
    let {content,user} = req.body
    const {id} = req.params
    const data = await topicModel.findById(id)
    const updateData = await data.updateOne({
      $set: {
        user,
        content
      }
    })
    res.json({
      code: 200,
      msg: '评论主题信息修改成功',
      data: updateData
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router