import {
    Router
} from "express";
import ThreadController from "../../controllers/threadController.js";
import CommentController from "../../controllers/commentController.js";

import _ from "lodash";

const router = Router();

router.post("/", (req, res, next) => {
    let user = req.user;
    let text = req.body.text;
    let images = req.body.images;

    ThreadController.addThread(user, text, images).then((thread) => {
        res.json({
            error: false,
            data: {
                thread: thread
            }
        });
    }).catch((error) => {
        res.status(500).json({
            error: true,
            message: "Error on creating thread"
        });
    });
});

router.get("/:threadId", (req, res, next) => {
    let threadId = req.params.threadId;

    ThreadController.getThread(threadId).then((thread) => {
        res.json({
            error: false,
            data: {
                thread: thread
            }
        });
    }).catch((error) => {
        console.log(`Error on getting thread of id ${threadId}. Error: ${error}`);
        res.status(500).json({
            error: true,
            message: `Error on getting thread of given id`
        });
    });
});

router.get("/", (req, res, next) => {
    ThreadController.getThreads().then((threads) => {
        res.json({
            error: false,
            data: {
                threads: threads
            }
        });
    }).catch((error) => {
        console.log(`Error on getting threads. Error: ${error}`);
        res.status(500).json({
            error: true,
            message: "Error on getting threads"
        });
    });
});

router.get("/:threadId/comments", async(req, res, next) => {
    let threadId = req.params.threadId;

    let thread = {};

    try {
        thread = await ThreadController.getThread(threadId);
    } catch(error) {
        console.log(`Error on getting thread. Url: ${req.originalUrl}. Error: ${error}`);

        res.status(500).json({
            error: true,
            message: "Error on getting thread of given id"
        });
        return;
    }

    CommentController.getCommentsOfThread(thread).then((comments) => {
        let commentsIds = [];
        _.map(comments, (comment) => {
            let commentId = comment._id;
            commentsIds.push(commentId);
        });

        res.json({
            error: false,
            data: {
                comments: commentsIds
            }
        });
    }).catch((error) => {
        console.log(`Error on getting comments of thread. Error: ${error}`);
        res.status(500).json({
            error: true,
            message: "Error on getting comments"
        });
    });
});


export default router;
