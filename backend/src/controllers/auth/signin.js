const ErrorHandler = require("../../helpers/errors/errorHandler");
const User = require("../../models/userModel");
const { sendToken } = require("../../helpers/jwtToken/tokenHelper");

const signIn = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });
        if (!user) {
            return next(new ErrorHandler("This email is not exist", 401));
        }
        else {
            const isMatch = await user.comparePassword(data.password);
            if (!isMatch) {
                return next(new ErrorHandler("Invalid password", 401));
            }
        }
        return sendToken(user, 200, res);
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500, error));
    }
};

module.exports = signIn;