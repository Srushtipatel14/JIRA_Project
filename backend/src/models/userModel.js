const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: [2, "userName must have atleat 2 characters"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (value) => emailValidator.validate(value),
            message: (props) => `${props.value} is not valid email`
        }
    },
    password: {
        type: String,
        required: true,
        min: [6, "Password must have atleat 6 characters"],
        trim: true,
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ["admin", "member"],
            message: "{VALUE} is not supported role",
        },
        default: "member"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
},
    { timestamps: true }
);


userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.generateJWTFromUser = function () {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
    payload = {
        id: this._id,
        email: this.email,
        role: this.role,
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    })
    return token;
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("userCollection", userSchema);
