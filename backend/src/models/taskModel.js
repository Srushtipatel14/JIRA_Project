const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: [2, "title must have atleat 2 characters"],
        trim: true
    },
    description: {
        type: String,
        required: true,
        min: [2, "description must have atleat 2 characters"],
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["pending", "in progress", "complete"],
            message: "{VALUE} is not supported status",
        },
        default: "pending"
    },
    duedate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: {
            values: ["high", "medium", "low"],
            message: "{VALUE} is not supported status",
        }
    },
    projectId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "projectCollection",
    },
    isDelete: {
        type: Boolean,
        required: false
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    assignId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "userCollection",
    }
},
    { timestamps: true }
);


module.exports = mongoose.model("taskCollection", taskSchema);
