import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";

const controller = {};

controller.createSession = (userId) => {
    return new Promise((resolve, reject) => {
        Session.createSession(userId).then((session) => {
            resolve(session.token);
        }).catch((error) => {
            reject(new Error(`Error on creating session. Error: ${error}`));
        });
    });
};

controller.getSessionById = (sessionId) => {
    return new Promise((resolve, reject) => {
        Session.findOne({
            _id: sessionId
        }).then((session) => {
            resolve(session);
        }).catch((error) => {
            reject(new Error(`Error on getting session with given id. Error: ${error}`));
        });
    });
};

controller.getSessionByToken = (sessionToken) => {
    return new Promise((resolve, reject) => {
        Session.findOne({
            token: sessionToken
        }).then((session) => {
            resolve(session);
        }).catch((error) => {
            reject(new Error(`Error on getting session with given token. Error: ${error}`));
        });
    });
};

controller.removeSessionByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        Session.find({
            userId: userId
        }).remove().then(() => {
            resolve();
        }).catch((error) => {
            reject(new Error(`Error on removing session by userId. Err: ${error}`));
        });
    });
};

export default controller;
