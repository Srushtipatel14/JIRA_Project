const express = require("express");
const app = express();
const ErrorHandler  = require("./helpers/errors/errorHandler");
const cors = require("cors");
const cookieparser=require("cookie-parser");
app.use(express.json());
const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }
        else {
            return callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}));

app.use(cookieparser());

const adminRouter = require("./routes/adminroute");
const memberRouter = require("./routes/memberroute");
const authRouter=require("./routes/authroute")

app.use("/api/admin", adminRouter);
app.use("/api/member", memberRouter);
app.use("/api/auth",authRouter);

app.use((err, req, res, next) => {
    if (err instanceof ErrorHandler ) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            error: err.error || "No additional details provided",
        });
    }
    return res.status(500).json({
        error: "Internal Server Error",
        status: 500,
    });
});

module.exports = app;