const ErrorHandler = require("../../helpers/errors/errorHandler");
const User = require("../../models/userModel");
const { sendToken } = require("../../helpers/jwtToken/tokenHelper");

const signUp = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });
        let savedUser;
        if (!user) {
            const newUser = new User(data);
            savedUser = await newUser.save();
        }
        else {
            return next(new ErrorHandler("Email is already registerd", 401));
        }
        return sendToken(savedUser, 200, res);
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500, error));
    }
};

module.exports = signUp;