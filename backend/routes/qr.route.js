const router = require('express').Router()
const { generateQr, getAllGeneratedQrs, generateQrForUrl, deleteQR} = require('../controllers/qr.controller')
const { authenticate } = require('../middlewares/authentication')


router.post("/", authenticate, generateQr)
router.post("/url", generateQrForUrl)
router.get("/", authenticate, getAllGeneratedQrs)
router.delete("/:id", authenticate, deleteQR)


module.exports = router