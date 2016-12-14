import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mainRouter from "./routers/index.js";

const app = express();

// dev
import cors from "cors";
app.use(cors({
    origin: "http://client.localhost",
    credentials: true
}));

app.set("trust_proxy", 1);

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", mainRouter);

const port = 2000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
