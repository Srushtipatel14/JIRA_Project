const ErrorHandler = require("../../../helpers/errors/errorHandler");
const Task = require("../../../models/taskModel");

const getAllTaskByProject = async (req, res, next) => {
    try {
        const id=req.params.id;
        const taskData = await Task.find({projectId:id}).populate("assignId", "userName email role").lean();

        return res.status(200).json({
            success: true,
            message: "Task retrieved successfully",
            data: taskData
        });
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500, error));
    }
};

module.exports = getAllTaskByProject;
