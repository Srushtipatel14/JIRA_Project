const { GoogleGenerativeAI } = require("@google/generative-ai");
const Task = require("../../../models/taskModel.js");
const Project = require("../../../models/projectModel.js");
const User = require("../../../models/userModel.js");
const ErrorHandler = require("../../../helpers/errors/errorHandler.js");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const getDashBoardData = async (req, res, next) => {
//     try {

//         const tasks = await Task.find();
//         const projects = await Project.find();
//         const users = await User.find();

//         const summary = {
//             totalTasks: tasks.length,
//             overdueTasks: tasks.filter((t) => new Date(t.dueDate) < new Date() && t.status !== "completed").length,
//             completedTasks: tasks.filter((t) => t.status === "completed").length,
//             usersTaskCount: users.map((u) => ({
//                 name: u.name,
//                 taskCount: tasks.filter((t) => t.assignedTo?.toString() === u._id.toString()).length
//             })),
//             projectsStatus: projects.map((p) => ({
//                 name: p.name,
//                 totalTasks: tasks.filter((t) => t.projectId?.toString() === p._id.toString()).length,
//                 completed: tasks.filter((t) => t.projectId?.toString() === p._id.toString() && t.status === "completed").length,
//             })),
//         };

//         const prompt = `You are an AI project assistant.Analyze this dashboard data and provide 3-5 key insights with emojis.Data: ${JSON.stringify(summary)}`;
//         const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
//         const result = await model.generateContent(prompt);
//         const insights = result.response.text();
//         return res.json({ success: true, message: "getting summarized data successfully", data: insights });
//     } catch (err) {
//         console.error(err);
//         return next(new ErrorHandler("Something went wrong", 500, err));
//     }
// };

module.exports = getDashBoardData;
