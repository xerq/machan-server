import {
    Router
} from "express";
import SessionController from "../../controllers/sessionController.js";

const router = Router();

router.get("/status", (req, res, next) => {
    if(!req.cookies || !req.cookies["token"]) {
        res.json({
            error: false,
            data: {
                status: {
                    valid: false
                }
            }
        });
        return;
    }

    let token = req.cookies.token;

    SessionController.getSessionByToken(token).then((session) => {
        res.json({
            error: false,
            data: {
                status: {
                    valid: session ? true : false
                }
            }
        });
    }).catch((error) => {
        console.log(`Error on getting session by token(${token})`);

        res.json({
            error: true,
            message: "Error on getting session with your token"
        });
    });
});

// router.get("/by/token/:token", (req, res, next) => {
//     let token = req.params.sessionId;
//
//     SessionController.getSessionByToken(token).then((session) => {
//         if (!session) {
//             res.json({
//                 error: true,
//                 message: "Couldn't find session with given token"
//             });
//         }
//         res.json({
//             error: false,
//             data: {
//                 session: session
//             }
//         });
//     }).catch((error) => {
//         console.log(`Error on getting session with given token(${token})`);
//
//         res.json({
//             error: true,
//             message: "Error on getting session with given token"
//         });
//     });
// });

export default router;
