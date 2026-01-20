const express=require("express")
const {connect}=require("mongoose")
require("dotenv").config()
const cors=require("cors")
const upload=require("express-fileupload")
const { notFound, errorHandle } = require("./middleware/Erromiddleware")
const routes=require('./route/routes')
const app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))
app.use(cors({credentials:true,origin:["http://localhost:5173"]}))
app.use(upload())

app.use('/api',routes)
app.use(notFound)
app.use(errorHandle)


connect(process.env.MONGODB_URI).then(
 app.listen(process.env.PORT,()=>{
    console.log("server up")
})
).catch( err=>console.log(err))

