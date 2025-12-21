
const express =require('express');
const mongoose=require('mongoose')
const userRoutes=require("./routes/studentRoutes")
const app=express()
const PORT=8000

mongoose.connect("mongodb+srv://yaksha:292100@cluster0.zxjzegx.mongodb.net/?appName=Cluster0")
.then(()=>{console.log('connected to DB')})
.catch((err)=>{
    console.log(err)
})

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello')

}) 

app.use(userRoutes)
app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})