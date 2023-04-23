const jwt= require('jsonwebtoken')
const secret= "booklist"

module.exports= function(req, res, next){
    try {
        let userToken= req.header('authentication')
        if(!userToken){
            return res.status(400).send("token not found");
        }
        let userDecodedToken= jwt.verify(userToken, secret)
        req.user= userDecodedToken;
        next()
    } catch (error) {
        return res.status(500).send(error.message);
    }
}