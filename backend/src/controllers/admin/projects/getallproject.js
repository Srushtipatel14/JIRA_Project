const ErrorHandler = require("../../../helpers/errors/errorHandler");
const Project = require("../../../models/projectModel");

const getAllProject = async (req, res, next) => {
    try {
        const projectData = await Project.find().populate("collaborators.userId", "userName email role").lean();

        return res.status(200).json({
            success: true,
            message: "Project retrieved successfully",
            data: projectData
        });
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500, error));
    }
};

module.exports = getAllProject;
