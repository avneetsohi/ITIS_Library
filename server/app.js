const express= require("express")
const app=express();
const { connect } = require("./config/database");
const routes = require("./routes/Routes");
const cookieParser = require("cookie-parser");
const fs = require("fs")
const path = require("path")
const https = require('https');
const http = require('http');

const cors=require("cors");

require("dotenv").config();

const PORT=process.env.PORT || 3000;

// const options = {
//     key: fs.readFileSync(path.resolve('C:/Windows/System32/localhost-key.pem')),
//     cert: fs.readFileSync(path.resolve('C:/Windows/System32/localhost.pem'))
// };


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

// https.createServer(options, app).listen(443, () => {
//     console.log('Secure server running on port 443');
// });

// http.createServer((req, res) => {
//   res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//   res.end();
// }).listen(80);


