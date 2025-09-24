const ErrorHandler = require("../../helpers/errors/errorHandler");
const Task = require("../../models/taskModel");

const editassignTask = async (req, res, next) => {
    try {
        const data = req.body;
        const { id } = req.member;
        const editTask = await Task.findOneAndUpdate(
            { _id: data._id, "assignId": id },
            { $set: { status: data.status } },    
            { new: true, runValidators: true }
        );
        if (!editTask) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this task or Task not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            data: editTask
        });
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500, error));
    }
};

module.exports = editassignTask;
