const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRouter = require('./routes/user.route')
const urlRouter = require('./routes/url.route')
const qrRouter = require('./routes/qr.route')

app.use("/api/users", userRouter)
app.use("/api/urls", urlRouter)
app.use("/api/qrs", qrRouter)


module.exports = app;
