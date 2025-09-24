const ErrorHandler = require("../../helpers/errors/errorHandler");
const Task = require("../../models/taskModel");

const getTaskAssignToMember = async (req, res, next) => {
    try {
        const userId = req.member.id;
        const tasks = await Task.find({ "assignId": userId })
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ success: false, message: "No tasks assigned to this user" });
        }
        return res.status(200).json({ success: true, message: "Tasks retrieved successfully", data: tasks });
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500, error));
    }
};

module.exports = getTaskAssignToMember;
