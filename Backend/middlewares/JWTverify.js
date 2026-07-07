const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const JWTverify = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token) {
            return res.status(400).json({
                success : false,
                message : "internal Error"
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(400).json({
                success : false,
                message : "internal Error"
            });
        }
        const user = await userModel.findById(decoded.id).select("-password");
        if(!user) {
            return res.status(400).json({
                success : false,
                message : "internal Error"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = JWTverify;