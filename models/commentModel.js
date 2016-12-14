import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    threadId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: false
    }
});

const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;
