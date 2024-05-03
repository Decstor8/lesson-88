import express from 'express';
import cors from 'cors';
import  mongoose from "mongoose";
import config from "./config";
import usersRouter from "./Routers/users";
import postsRouter from "./Routers/posts";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/posts', postsRouter)

const run = async () => {
    await mongoose.connect(config.mongoose.db);

    app.listen(port, () => {
       console.log(`Сервер запустился на порту ${port}`);
    });

    process.on('exit', () => {
       mongoose.disconnect();
    });
};

void run();