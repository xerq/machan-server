import mongoose from "mongoose";
import crypto from "crypto";

var SessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true,
        index: {
          unique: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 1 * 24 * 60 * 60
    }
});

SessionSchema.statics.createSession = (userId) => {
    let Session = mongoose.model("Session");

    let token = crypto.randomBytes(64).toString("hex");

    return new Promise((resolve, reject) => {
        let sess = new Session({
            userId: userId,
            token: token
        });

        sess.save().then(() => {
            resolve(sess);
        }).catch((error) => {
            reject(new Error(`Error on saving session to the db. Error: ${error}`));
        });
    });
};

const SessionModel = mongoose.model("Session", SessionSchema);

export default SessionModel;
