const router = require('express').Router()
const { createShortened, getAllShortened, getShortened, enableUrl, disableUrl, updatePassword, deleteShortened, shortenedsSummary} = require('../controllers/url.controller')
const {authenticate} = require('../middlewares/authentication')
const { getLoginUser } = require('../middlewares/loginUser')

router.post("/", getLoginUser,  createShortened)
router.post("/:shortCode", getShortened)
router.get("/", authenticate, getAllShortened)

router.put("/enable/:id", authenticate, enableUrl)
router.put("/disable/:id", authenticate, disableUrl)
router.put("/password/:id", authenticate, updatePassword)
router.delete("/:id", authenticate, deleteShortened)
router.get("/summary", authenticate, shortenedsSummary)


module.exports = router