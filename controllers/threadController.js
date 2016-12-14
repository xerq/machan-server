import Thread from "../models/threadModel.js";

const controller = {};

controller.addThread = (user, text, images) => {
    return new Promise((resolve, reject) => {
        var thread = new Thread({
            userId: user._id,
            text: text,
            images: images
        });

        thread.save().then(() => {
            if(!thread) {
                reject(new Error(`Couldn't find thread with given id`));
                return;
            }
            resolve(thread);
        }).catch((error) => {
            reject(new Error(`Error on getting thread with given id. Error: ${error}`));
        });
    });
};

controller.getThread = (threadId) => {
    return new Promise((resolve, reject) => {
        Thread.findById(threadId).then((thread) => {
            resolve(thread);
        }).catch((error) => {
            reject(error);
        });
    });
};

controller.getThreads = () => {
    return new Promise((resolve, reject) => {
        Thread.find({}).then((threads) => {
            resolve(threads);
        }).catch((error) => {
            reject(error);
        });
    });
};

export default controller;
