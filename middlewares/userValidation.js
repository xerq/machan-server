import UserController from "../controllers/userController.js";

const userValidationMiddleware = (req, res, next) => {
    if(!req.cookies || !req.cookies["token"]) {
        res.status(500).json({
            error: true,
            message: "You need to provide token in order to use the API"
        });
        return;
    }

    let token = req.cookies.token;

    UserController.getUserByToken(token).then((user) => {
        req.user = user;
        next();
    }).catch((error) => {
        console.log(`Error on validating token(${token}). Error: ${error}`);

        res.status(500).json({
            error: true,
            message: "Error on validating token"
        });
    });
};

export default userValidationMiddleware;
