import { Router } from "express";
import UserValidation from "../middlewares/userValidation.js";
import UserRouter from "./user/";
import SessionRouter from "./session/";
import ThreadRouter from "./thread/";
import CommentRouter from "./comment/";

const router = Router();

// router.use("*", UserValidation);

router.get("/", (req, res) => {
    res.send("Test home");
});

router.use("/user", UserRouter);
router.use("/thread", UserValidation, ThreadRouter);
router.use("/comment", UserValidation, CommentRouter);
router.use("/session", SessionRouter);

export default router;
