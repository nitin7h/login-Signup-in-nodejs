const express = require("express")
const path = require('path')

const cookieParser = require("cookie-parser")



const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const checkForAuthenticationCookie = require("./middlewares/authentication");

mongoose.connect("mongodb://localhost:27017/blogify")
    .then(() => { console.log("Mongodb Connected...") })
    .catch((error) => {
        console.log("Mongo error " + error);
    })


const Port = 7000;

const app = express()

//handle for ejs
app.set('view engine', 'ejs')
app.set("views", path.resolve("./views"))

//for handling form data
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
    // app.use(checkForAuthenticationCookie('token'))


app.get("/", (req, res) => {
    res.render("home", {
        user: req.user
    })
})

app.use("/user", userRouter)




app.listen(Port, () => { console.log(`Port listening on ${Port}`); })