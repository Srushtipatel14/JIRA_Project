const ErrorHandler = require("../../../helpers/errors/errorHandler");
const Task = require("../../../models/taskModel");

const getSingleTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const taskData = await Task.findById(taskId)

        if (!taskData) {
            return next(new ErrorHandler("Task not found", 404));
        }

        return res.status(200).json({
            success: true,
            message: "Task retrieved successfully",
            data: taskData
        });
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500, error));
    }
};

module.exports = getSingleTask;
