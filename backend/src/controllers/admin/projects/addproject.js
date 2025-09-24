const ErrorHandler = require("../../../helpers/errors/errorHandler");
const Project = require("../../../models/projectModel");

const addProject = async (req, res, next) => {
    try {
        const data = req.body;
        const { id } = req.admin;
        data.ownerId = id;
        const isProjectPresent = await Project.findOne({ title: data.title });
        if (isProjectPresent) {
            return res.status(400).json({
                success: false,
                message: "This project already exists"
            });
        }
        const newProject = new Project(data);
        const savedProject = await newProject.save();

        return res.status(201).json({
            success: true,
            message: "Project added successfully",
            data: savedProject
        });
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500, error));
    }
};

module.exports = addProject;
