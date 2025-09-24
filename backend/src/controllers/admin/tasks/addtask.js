const ErrorHandler = require("../../../helpers/errors/errorHandler");
const Task = require("../../../models/taskModel");

const addTask = async (req, res, next) => {
    try {
        const data = req.body;
        const { id } = req.admin;
        data.createdBy = id;
        const isTaskPresent = await Task.findOne({ title: data.title });
        if (isTaskPresent) {
            return res.status(400).json({
                success: false,
                message: "This task is already exists"
            });
        }
        const newTask = new Task(data);
        const savedTask = await newTask.save();
        return res.status(201).json({
            success: true,
            message: "Task added successfully",
            data: savedTask
        });
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500, error));
    }
};

module.exports = addTask;
