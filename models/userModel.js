import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    ipMaker: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: false
    }
});

UserSchema.index({
    ipMaker: 1,
    name: 1
}, {
    unique: true
});

const encryptPassword = (password) => {
    let salt = bcrypt.genSaltSync(10);

    let crypted = bcrypt.hashSync(password, salt);

    return crypted;
};

UserSchema.statics.encryptPassword = encryptPassword;

UserSchema.statics.findUser = (ip, name, password) => {
    let User = mongoose.model("User");

    return new Promise((resolve, reject) => {
        if (name == "Anonymous" && !password && ip) {
            User.findOne({
                ipMaker: ip,
                name: "Anonymous"
            }).then((foundUser) => {
                resolve(foundUser);
            }).catch((error) => {
                reject(error);
            });
        } else if (name && password) {
            User.findOne({
                name: name
            }).then((foundUser) => {
                let isPasswordCorrect = bcrypt.compareSync(password, foundUser.passwordHash);

                if(isPasswordCorrect) {
                    resolve(foundUser);
                } else {
                    reject(new Error(`Password doesn't match`));
                }
            }).catch((error) => {
                reject(error);
            });
        } else {
            reject(new Error("Didn't find any user with given params"));
        }
    });
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
