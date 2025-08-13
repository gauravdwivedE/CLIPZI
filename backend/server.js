require("dotenv").config()
const app = require('./app')

const connectDB = require('./configs/mongo.config')

app.listen(process.env.PORT, ()=> {
    connectDB() 
    console.log(`Server is listning on ${process.env.PORT}`); 
})