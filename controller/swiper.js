const {Router} = require('express')
const router = Router()
const swiperModel = require('../model/swiper')
const auth = require('../config/auth')

router.post('/', auth, async (req,res,next) => {
  try {
    let {
      title,
      img,
      newsId,
      status,
      sort
    } = req.body

    const data = await swiperModel.create({
      title,
      img,
      newsId,
      status,
      sort
    })

    res.json({
      code: 200,
      msg: '轮播图添加成功',
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
    const data = await swiperModel.find()
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({sort:1,_id: 1})
      .populate({
        path: 'newsId',
        select: '-password'
      })

      res.json({
        code: 200,
        msg: '轮播图获取成功',
        data
      })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const data = await swiperModel.findById(id)
      .populate({
        path: 'newsId',
        select: '-password'
      })

    res.json({
      code: 200,
      msg: '轮播图获取成功',
      data
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', auth, async (req,res,next) => {
  try {
    let {
      title,
      img,
      newsId,
      status,
      sort
    } = req.body
    const {id} = req.params
    const data = await swiperModel.findById(id)
    const updateData = await data.updateOne({$set: {
      title,
      img,
      newsId,
      status,
      sort
    }})
    res.json({
      code: 200,
      msg: '轮播图修改成功',
      data: updateData
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router