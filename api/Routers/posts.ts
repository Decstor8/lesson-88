import {Router} from "express";
import Post from "../models/Post";
import {PostTypes} from "../types";
import {imageUpload} from "../multer";

const postsRouter = Router();

postsRouter.get('/', async (_req, res, next) => {
    try {
        const posts = await Post.find();

        res.send(posts);
    } catch (err) {
        next(err);
    }
});

postsRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
    try {
        const postDataMain: PostTypes = {
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
        };

        if (!req.body.description && !req.body.image) {
            res.status(422).send({error: 'Отказ! Нужно заполнить минимум одно из полей'});
        } else {
            const post = new Post(postDataMain);
            await post.save();

            return res.send(post);
        }
    } catch (err) {
        next(err);
    }
});

export default postsRouter;