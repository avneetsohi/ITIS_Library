const express= require("express")
const { connect } = require("./config/database");
const routes = require("./routes/Routes");
const cookieParser = require("cookie-parser");
const fs = require("fs")
const path = require("path")
const https = require('https');
const http = require('http');
const cors=require("cors");
require("dotenv").config();

const app=express();

const PORT=process.env.PORT || 8000;

const buildpath = path.resolve("../build")
app.use(express.static(buildpath))
console.log(buildpath)


// middlewares
app.use(express.json());

app.use(cookieParser())


app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)


// routes
app.use("/api/v1",routes)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

// mongo db connect
connect();


// default route
app.get("/",(req,res)=>{
    res.send("Backend Running")
})




// const PORT=process.env.PORT || 8000;

// // middlewares
// app.use(express.json());

// app.use(cookieParser())

// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         credentials:true
//     })
// )

// app.get('/',(req,res,next)=>{
//     res.send("Hello from SSL Server")
// })

// app.use("/api/v1",routes)

// const sslServer=https.createServer({
//     key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
//     cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
// },app)

// sslServer.listen(PORT,()=>console.log(`Secure server running on PORT ${PORT}`))

// connect();