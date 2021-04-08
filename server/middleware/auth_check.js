const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const tokenData = jwt.verify(token, process.env.JWT_KEY);
        let userData = {
            token : token,
            data : tokenData
        }
        res.userData = userData;
        next();
    }
    catch(err) {
        return res.status(401).json({

            message: "aunthentication failed"
        })
    }
}