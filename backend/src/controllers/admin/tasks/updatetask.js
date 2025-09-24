const ErrorHandler = require("../../../helpers/errors/errorHandler");
const Task = require("../../../models/taskModel");

const updateTask = async (req, res, next) => {
    try {
        const data = req.body;
        const { id } = req.admin;
        data.ownerId = id;

        const editTask = await Task.findByIdAndUpdate(
            data._id,
            { $set: data },
            { new: true, runValidators: true }
        );
        if (!editTask) {
            return res.status(404).json({success: false,message: "Task not found"});
        }
        return res.status(200).json({success: true,message: "Task edited successfully",data: editTask});
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500, error));
    }
};

module.exports = updateTask;
