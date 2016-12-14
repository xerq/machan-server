import User from "../models/userModel.js";
import Session from "../models/sessionModel.js";
import SessionController from "./sessionController.js";

const controller = {};

controller.addAccount = (ip, name, password) => {
    return new Promise((resolve, reject) => {
        var user = new User({
            ipMaker: ip,
            name: name
        });

        user.passwordHash = password ? User.encryptPassword(password) : "";

        user.save().then(() => {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
};

controller.logIn = (ip, name, password) => {
    return new Promise((resolve, reject) => {
        User.findUser(ip, name, password).then((user) => {
            if(!user) {
                reject(new Error(`Couldn't find any user with given params.`));
                return;
            }

            SessionController.removeSessionByUserId(user._id).then(() => {
                SessionController.createSession(user._id).then((token) => {
                    resolve(token);
                }).catch((error) => {
                    reject(new Error(`Error on creating session for user. Error: ${error}`));
                });
            }).catch((error) => {
                reject(new Error(`Error on removing existing sessions`));
            });
        }).catch((error) => {
            reject(new Error(`Error on finding user with given params. Error: ${error}`));
        });
    });
};

controller.getUserByToken = (token) => {
    return new Promise((resolve, reject) => {
        Session.findOne({
            token: token
        }).then((sess) => {
            let userId = sess.userId;

            User.findOne({
                _id: userId
            }).then((user) => {
                resolve(user);
            }).catch((error) => {
                reject(new Error(`Error on finding user with userId of found session. Error: ${error}`));
            });
        }).catch((error) => {
            reject(new Error(`Error on finding sessions with given token. Error: ${error}`));
        });
    });
};

export default controller;
