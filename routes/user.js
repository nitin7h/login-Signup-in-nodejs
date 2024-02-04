const { Router } = require("express")

const User = require("../models/user")

const router = Router()

router.get("/signin", (req, res) => {
    res.render("signin")
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post("/signup", async(req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password
    })

    return res.redirect("/")

})

router.post("/signin", async(req, res) => {
    const { email, password } = req.body

    try {
        const token = await User.matchpasswordAndGenerateToken(email, password)
        console.log("user", token);
        return res.cookie("token", token).redirect("/")

    } catch (error) {

        res.redirect("signin")

        error: "incorrect passwor or email !"

    }






})

module.exports = router;