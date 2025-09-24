const ErrorHandler = require("../../../helpers/errors/errorHandler");
const User = require("../../../models/userModel");

const getAllUser = async (req, res, next) => {
    try {
        const userData = await User.find({ role: { $ne: "admin" } }).select("_id userName email role");
        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: userData
        });
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500, error));
    }
};

module.exports = getAllUser;
