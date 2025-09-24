const sendToken = async (user, statusCode, res) => {
    const token = user.generateJWTFromUser();
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax'
    });
    return res.status(statusCode).json({
        success: true,
        data: {
            user: user.userName,
            email: user.email,
            role: user.role,
        }
    })
};

const getAccessTokenFromHeader = (req) => {
    const { token } = req.cookies;
    return token;
}

const isTokenIncluded = (req) => {
    return (
        req.cookies && req.cookies.token
    )
}

module.exports = { sendToken, getAccessTokenFromHeader, isTokenIncluded }