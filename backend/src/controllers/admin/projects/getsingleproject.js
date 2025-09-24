const ErrorHandler = require("../../../helpers/errors/errorHandler");
const Project = require("../../../models/projectModel");

const getSingleProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const projectData = await Project.findById(projectId)
            .populate("collaborators.userId", "userName email role")
            .lean();
        if (!projectData) {
            return next(new ErrorHandler("Project not found", 404));
        }

        return res.status(200).json({
            success: true,
            message: "Project retrieved successfully",
            data: projectData
        });
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500, error));
    }
};

module.exports = getSingleProject;
