const ErrorHandler = require("../../../helpers/errors/errorHandler");
const Project = require("../../../models/projectModel");

const updateProject = async (req, res, next) => {
    try {
        const data = req.body;
        const { id } = req.admin;
        data.ownerId = id;

        const updatedProject = await Project.findByIdAndUpdate(
            data._id,
            { $set: data },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({success: false,message: "Project not found",});
        }

        return res.status(200).json({success: true,message: "Project edited successfully",data: updatedProject});
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500, error));
    }
};

module.exports = updateProject;
