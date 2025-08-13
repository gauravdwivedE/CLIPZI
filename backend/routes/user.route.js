const router = require('express').Router()
const { createUser, loginUser, googleLogin, getCurrentUser} = require('../controllers/user.controller')
const { authenticate }  = require('../middlewares/authentication')

router.post("/register", createUser)
router.post("/login", loginUser)
router.post("/login/oauth", googleLogin)
router.get('/me', authenticate, getCurrentUser);

module.exports = router