const jwt = require("jsonwebtoken")

const secrate = "Nitin@2001"

function createTokenForUser(user) { // generate the token
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role
    }

    const token = jwt.sign(payload, secrate)
    return token;
}


function validateToken(token) { //it verify the token
    const payload = jwt.verify(token)
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
}