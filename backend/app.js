const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./utils/db-connection')
const cricketRoutes = require('./routes/cricketRoutes')
require('./model/userModel')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//routes
app.use('/cricket-career', cricketRoutes)


db.sync().then(() => {
    app.listen(3000, () => {
    console.log("Server is running on 3000")
})
}).catch((err) => {
    console.log(err)
});
