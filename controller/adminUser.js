const {Router} = require('express')
const router = Router()
const adminUserModel = require('../model/adminUser')
const auth = require('../config/auth')

router.post('/', auth, async (req,res,next) => {
  try {
    let {
      username,
      nickname,
      avatar,
      password,
      jobRank,
      phone,
      sex,
      desc,
      hometown,
      workAddress
    } = req.body

    const userData = await adminUserModel.create({
      username,
      nickname,
      avatar,
      password,
      jobRank,
      phone,
      sex,
      desc,
      hometown,
      workAddress
    })
    res.json({
      code: 200,
      userData,
      msg: '管理员添加成功'
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', auth, async (req, res, next) => {
  try {
    let {
      username,
      nickname,
      avatar,
      password,
      jobRank,
      phone,
      sex,
      desc
    } = req.body
    const { id } = req.params
    const data = await adminUserModel.findById(id)
    const updateData = await data.updateOne({
      $set: {
        username,
        nickname,
        avatar,
        password,
        jobRank,
        phone,
        sex,
        desc
      }
    })
    res.json({
      code: 200,
      msg: '管理员信息修改成功',
      data: updateData
    })
  } catch (error) {
    next(error)
  }
})

router.post('/login',async (req,res,next) => {
  try {
    const { username, password } = req.body
    if(username&&password) { 
      const user = await adminUserModel.findOne({ username })
      if (user) { // 用户存在
        if (password == user.password) {
          req.session.user = user // 登录成功将用户信息存到session
          res.json({
            code: 200,
            msg: '登录成功',
            data: {
              username: user.username,
              avatar: user.avatar,
              id: user._id,
              nickname: user.nickname
            }
          })
        } else {
          res.json({
            code: 401,
            msg: '密码错误'
          })
        }
      } else { // 用户不存在
        res.json({
          code: 400,
          msg: '该用户不存在'
        })
      }
    } else { 
      res.json({
        code: 401,
        msg: '缺少必要参数'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/',async (req,res,next) => {
  try {
    let count = await adminUserModel.count()
    let { page = 1, page_size = 10 } = req.query
    page = parseInt(page)
    page_size = parseInt(page_size)
    const data = await adminUserModel.find()
      .skip((page - 1) * page_size)
      .limit(page_size)
      // .sort({ _id: -1 })
      .select('-password')

    res.json({
      code: 200,
      total: count,
      data
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:id',async (req,res,next) => {
  try {
    const { id } = req.params
    const data = await adminUserModel.findById(id)
      // .select('-password')

    res.json({
      code: 200,
      msg: '管理员信息获取成功',
      data
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/', auth, async (req,res,next) => {
  try {
    const { id } = req.query
    const data = await adminUserModel.deleteOne({ _id:id })
    res.json({
      code: 200,
      msg: '删除管理员成功',
      data
    })
  } catch (error) {
    next(error)
  }
})

router.post('/logout',(req,res,next) => {
  if (req.session.user) {
    req.session.user = null
    res.json({
      code: 200,
      msg: '退出登录成功'
    })
  } else {
    res.json({
      code: 400,
      msg: '未登录状态'
    })
  }
})

module.exports = router