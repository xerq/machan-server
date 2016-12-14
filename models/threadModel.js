import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: false,
    }
});

const ThreadModel = mongoose.model("Thread", ThreadSchema);

export default ThreadModel;
