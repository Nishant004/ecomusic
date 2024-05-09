
const express = require('express')
const app = express()
require('dotenv').config()
const dbConfig = require('./config/dbConfig')

const path = require('path')
// const url = require('url')



app.use(express.json())
const userRoute = require('./routes/userRoute')
const songsRoute = require('./routes/songsRoute')
const adminRoute = require('./routes/adminRoute')

app.use('/api/users', userRoute)
app.use('/api/songs', songsRoute)
app.use('/api/admin', adminRoute)






const port = process.env.PORT || 5000




//--------Deployment-----

const __dirname1 = path.resolve()

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname1,"/client/build")));

    app.get("*" , (req,res) => {
        res.sendFile(path.resolve(__dirname1,"client","build","index.html"));
    });
}


app.listen(port, () => console.log(`Node js server started at port ${port}!`))