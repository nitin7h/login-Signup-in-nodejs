const { Schema, model } = require("mongoose")

const { createHmac, randomBytes } = require('node:crypto'); //for hashing password this is builtin fn


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        // unique: true
    },

    salt: { // for hashing password
        type: String,
        // required: true,

    },
    password: {
        type: String,
        required: true,

    },
    profileImageUrl: {
        type: String,
        default: "images/avatar.jpg"

    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true })


//for hashing password
userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified("password")) return;


    const salt = randomBytes(16).toString() //it creates random string or secrate key
        // const salt = "Nitin@321"
    const hashPassword = createHmac('sha256', salt).update(user.password).digest("hex")

    this.salt = salt
    this.password = hashPassword;
    next();
});


//for matching password
userSchema.static("matchpassword", async function(email, password) {
    const user = await this.findOne({ email })
    if (!user) throw new Error("User not found !")
    const salt = user.salt
    const hashedPassword = user.password

    const userProvidedHash = createHmac('sha256', salt)
        .update(password).digest("hex")


    if (hashedPassword !== userProvidedHash) throw new Error("Incorrect Password !")
        //return hashedPassword === userProvidedHash

    return {...user, password: undefined, salt: undefined }



})

const User = model("user", userSchema);


module.exports = User;