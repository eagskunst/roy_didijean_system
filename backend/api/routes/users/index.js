const express = require('express')
const UserService = require('../../services/user')

const router = express.Router()
const service = new UserService()

router.post("/", async (req, res)=>{
  try {
    const body = req.body
    const newUser = await service.create(body)
    res.status(201).json({
      message: 'user created',
      data: newUser
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
