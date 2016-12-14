import {
    Router
} from "express";
import CommentController from "../../controllers/commentController.js";
import ThreadController from "../../controllers/threadController.js";

const router = Router();

router.post("/", async(req, res, next) => {
    let user = req.user;
    let threadId = req.body.threadId;
    let text = req.body.text;
    let images = req.body.images;

    let thread = {};

    try {
        thread = await ThreadController.getThread(threadId);
    } catch (error) {
        console.log(`Error on getting thread. Url: ${req.originalUrl}. Error: ${error}`);
        
        res.json({
            error: true,
            message: "Error on getting thread of given id"
        });
        return;
    }

    CommentController.addComment(user, thread, text, images).then((comment) => {
        res.json({
            error: false,
            data: {
                comment: comment
            }
        });
    }).catch((error) => {
        res.status(500).json({
            error: true,
            message: "Error on creating comment"
        });
    });
});

router.get("/:commentId", (req, res, next) => {
    let commentId = req.params.commentId;

    CommentController.getComment(commentId).then((comment) => {
        res.json({
            error: false,
            data: {
                comment: comment
            }
        });
    }).catch((error) => {
        console.log(`Error on getting comment of id ${commentId}. Error: ${error}`);
        res.status(500).json({
            error: true,
            message: `Error on getting comment of given id`
        });
    });
});


export default router;
