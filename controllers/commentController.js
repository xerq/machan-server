import Comment from "../models/commentModel.js";

const controller = {};

controller.addComment = (user, thread, text, images) => {
    let userId = user._id;
    let threadId = thread._id;
    text = text;
    images = images || [];

    return new Promise((resolve, reject) => {
        let comment = new Comment({
            userId: userId,
            threadId: threadId,
            text: text,
            images: images
        });

        comment.save().then(() => {
            resolve(comment);
        }).catch((error) => {
            reject(new Error(`Error on saving comment to db`));
        });
    });
};

controller.getComment = (commentId) => {
    return new Promise((resolve, reject) => {
        Comment.findById(commentId).then((comment) => {
            if (!comment) {
                reject(new Error(`Couldn't find comment with given id`));
                return;
            }

            resolve(comment);
        }).catch((error) => {
            reject(new Error(`Error on getting comment with given id. Error: ${error}`));
        });
    });
};

controller.getCommentsOfThread = (thread) => {
    return new Promise((resolve, reject) => {
        Comment.find({
            threadId: thread._id
        }).then((comments) => {
            if (!comments) {
                reject(new Error(`Couldn't find comments with given thread id`));
                return;
            }

            resolve(comments);
        }).catch((error) => {
            reject(new Error(`Error on getting comments of thread. Error: ${error}`));
        });
    });
};


export default controller;
