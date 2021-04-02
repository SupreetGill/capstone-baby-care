const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //the original token that is coming from the client side  in the header, might /might not be correct token
        const token = req.headers.authorization;
        // const token = req.headers.authorization.split(" ")[1];
        // we are verifying the token using the jwt.verigy method
        const tokenData = jwt.verify(token, process.env.JWT_KEY);
        let userData = {
            token : token,
            data : tokenData
        }
        //passed on as a response to next function on the server side
        res.userData = userData;
        next();
    }
    catch(err) {
        //any code /res in catch block is meant for the front end, in case the middleware shows ans error and dosent
        // proceed to next() function 
        return res.status(401).json({
            // either the token is changed or signature is changed or the token is missing
            message: "aunthentication failed"
        })
    }
}