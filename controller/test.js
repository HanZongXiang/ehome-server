const {Router} = require('express')
const router = Router()
const adminUserModel = require('../model/adminUser')
const newsModel = require('../model/news')
const jwt = require('jsonwebtoken')
const cert = require('../config/cert')

router.post('/login',async (req,res,next) => {
  try {
    const { username, password } = req.body;
    const userData = await adminUserModel.findOne({username})
    if (userData) {
      if (password == userData.password) {
        const token = jwt.sign({userId: userData._id}, cert ,{expiresIn: 60*60*24})
        res.json({
          code: 200,
          token,
          data: userData,
          msg: '登录成功'
        })
      } else {
        res.json({
          code: 400,
          msg: '密码不正确'
        })
      }
    } else {
      res.json({
        code: 400,
        msg: '该用户不存在'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/getNews1',async (req,res,next) => {
  try {
    const dataList = await newsModel.find()
    res.json({
      code: 200,
      data: dataList
    })
  } catch (error) {
    next(error)
  }
})

router.get('/getNews2',(req,res,next) => {
  try {
    let token = req.headers.token || req.body.token || req.query.token
    if (token) {
      jwt.verify(token, cert, function (err,decode) {
        if (err) {
          res.json({
            code: 403,
            msg: '登录状态失效'
          })
          return
        }

        // console.log(decode)
        adminUserModel.findOne({_id: decode.userId}).then(user => {
          newsModel.find().then(data => {
            res.json({
              code: 200,
              msg: 'success',
              data: {
                news: data,
                user
              }
            })
          })
        })
      })
    } else {
      res.json({
        code: 403,
        msg: '缺少token'
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router