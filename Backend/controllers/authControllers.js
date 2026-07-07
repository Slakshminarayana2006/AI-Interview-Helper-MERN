const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password) {
            return res.status(401).json({
                success : false,
                message : "Enter all details"
            });
        }

        const existedUser = await userModel.findOne({email});
        if(!existedUser) {
            return res.status(400).json({
                success : false,
                field : 'email',
                message : "Email is Registered"
            })
        }

        if(password.length < 6) {
            return res.status(400).json({
                success : false,
                field : "password",
                message : "Password should contains atleast 6 characters"
            })
        } 


        const hashedPassword = await bcrypt.hash(password, 8);

        if(!hashedPassword) {
            return res.status(400).json({
                success : false,
                message : "Internal error"
            });
        }

        const newUser = await userModel.create({
            username,
            email,
            password : hashedPassword
        });

        if(!newUser) {
            return res.status(400).json({
                success : false,
                message : "Internal error"
            });
        }

        const user = await userModel.findById(newUser._id).select("-password");

        if(!user) {
            return res.status(400).json({
                success : false,
                message : "Internal error"
            });
        }

        return res.status(200).json({
            success : true,
            message : "Registered Successfully",
            user
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                field: "email",
                message: "Email already exists"
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const loginController = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(401).json({
                success : false,
                message : "enter all details"
            })
        }

        const existedUser = await userModel.findOne({email});
        if(!existedUser) {
            return res.status(400).json({
                success : false,
                field : "email",
                message : "email doesn't existed"
            })
        }

        const comparedPassword = await bcrypt.compare(password, existedUser.password);
        if(!comparedPassword) {
            return res.status(400).json({
                success : false,
                field : "password",
                message : "Incorrected password"
            })
        }

        const token = await jwt.sign({id : existedUser._id}, process.env.JWT_SECRET);
        if(!token) {
            return res.status(400).json({
                success : false,
                message : "internal Error"
            })
        }

        const loginedUser = await userModel.findById(existedUser._id).select("-password");
        if(!loginedUser) {
            return res.status(400).json({
                success : false,
                message : "internal Error"
            })
        }

        return res.status(200).cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
}).json({
            success : true,
            message : "Login Success",
            user : loginedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const logoutController = async (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(400).json({
            success : false,
            message : "internal Error"
        });
    }

    return res.status(200).clearCookie("token").json({
        success : true,
        message : "Successfully logout"
    })
}

const getUserController = async (req, res) => {
    const userId = req.user.id;
    if(!userId) {
        return res.status(400).json({
            success : false,
            message : "internal Error"
        });
    }

    const user = await userModel.findById(userId).select("-password");
    
    if(!user) {
        return res.status(400).json({
            success : false,
            message : "internal Error"
        });
    }

    res.status(200).json({
        success : true,
        message : "User details fetched Successfull",
        user
    })
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    getUserController
}