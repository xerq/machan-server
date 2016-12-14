import {
    Router
} from "express";
import UserController from "../../controllers/userController.js";

const router = Router();

router.post("/register", (req, res, next) => {
    let ip = req.ip;
    let name = req.body.name;
    let password = req.body.password;

    UserController.addAccount(ip, name, password).then(() => {
        res.json({
            error: false,
            message: "Account created"
        });
    }).catch((error) => {
        res.status(500).json({
            error: true,
            message: "Error on creating account"
        });
    });
});

router.post("/login", (req, res, next) => {
    let ip = req.ip;
    let name = req.body.name;
    let password = req.body.password;

    UserController.logIn(ip, name, password).then((token) => {
        res.cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        res.json({
            error: false,
            data: {
                token: token
            }
        });
    }).catch((error) => {
        console.log(`Error on logging in. ip: ${ip}, name: ${name}, password: ${password}. Error: ${error}`);

        res.json({
            error: true,
            message: "Error on logging in"
        });
    });
});

export default router;
