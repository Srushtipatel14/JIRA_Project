const { GoogleGenerativeAI } = require("@google/generative-ai");
const Task = require("../../../models/taskModel.js");
const Project = require("../../../models/projectModel.js");
const User = require("../../../models/userModel.js");
const ErrorHandler = require("../../../helpers/errors/errorHandler.js");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getDashBoardData = async (req, res, next) => {
    try {

        const tasks = await Task.find();
        const projects = await Project.find();
        const users = await User.find();

        const summary = {
            totalTasks: tasks.length,
            overdueTasks: tasks.filter((t) => new Date(t.duedate) < new Date() && t.status !== "Complete").length,
            completedTasks: tasks.filter((t) => t.status === "Complete").length,
            usersTaskCount: users.map((u) => ({
                name: u.name,
                taskCount: tasks.filter((t) => t.assignId?.toString() === u._id.toString()).length
            })),
            projectsStatus: projects.map((p) => ({
                name: p.name,
                totalTasks: tasks.filter((t) => t.projectId?.toString() === p._id.toString()).length,
                completed: tasks.filter((t) => t.projectId?.toString() === p._id.toString() && t.status === "Complete").length,
            })),
        };

        const prompt = `You are an AI project assistant.Analyze this dashboard data and provide 3-5 key insights with emojis.Data: ${JSON.stringify(summary)}`;
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const insights = result.response.text();
        const dataVal={
            summary:insights,
            tasks:tasks.length,
            projects:projects.length,
            completeTasks:tasks.filter((t) => t.status === "Complete").length,
            pendingTasks:tasks.filter((t) => t.status === "Pending").length,
            inProgressTasks:tasks.filter((t) => t.status === "In Progress").length,
            overDueTasks:tasks.filter((t) => new Date(t.duedate) < new Date() && t.status !== "Complete").length

        }
        return res.json({ success: true, message: "getting summarized data successfully", data: dataVal });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Something went wrong", 500, err));
    }
};

module.exports = getDashBoardData;
