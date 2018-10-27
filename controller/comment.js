const {Router} = require('express')
const auth = require('../config/auth')
const topicModel = require('../model/topic')
const commentModel = require('../model/comment')
const router = Router()

// 添加主题评论
router.post('/', auth ,async (req,res,next) => {
  try {
    const { content, topicId } = req.body
    const user = req.session.user._id

    let comment;
    const topic = await topicModel.findById(topicId) // 根据id查找互动主题
    if (topic) {
      comment = await commentModel.create({
        content,
        user,
        topic: topicId,
      })
      await topic.updateOne({$push: {comment: comment._id}})
      
      res.json({
        code: 200,
        data: comment,
        msg: '评论添加成功'
      })
    } else {
      res.json({
        code: 400,
        msg: '该主题不存在'
      })
    }
  } catch (error) {
    next(error)
  }
})

// 获取主题评论
router.get('/:topicId', async (req,res,next) => {
  try {
    const topicId = req.params.topicId
    const data = await commentModel.find({topic: topicId})
      .populate({
        path: 'user',
        select: 'username avatar'
      })
      .populate({
        path: 'topic',
        select: 'content'
      })
      res.json({
        code: 200,
        msg : '请求成功',
        data
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router