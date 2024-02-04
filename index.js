const express = require("express")
const path = require('path')



const userRouter = require("./routes/user");
const mongoose = require("mongoose");

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


app.get("/", (req, res) => {
    res.render("home")
})

app.use("/user", userRouter)




app.listen(Port, () => { console.log(`Port listening on ${Port}`); })