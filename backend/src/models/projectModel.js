const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        unique:true,
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
    isDelete:{
        type:Boolean,
        required:false
    },
    ownerId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    collaborators: [{
        userId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "userCollection",
        }
    }]
},
    { timestamps: true }
);


module.exports = mongoose.model("projectCollection", projectSchema);
