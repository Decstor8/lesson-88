import {Router} from "express";
import Post from "../models/Post";
import {PostTypes} from "../types";
import {imageUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";

const postsRouter = Router();

postsRouter.get('/', async (_req, res, next) => {
    try {
        const posts = await Post.find().sort({datetime: -1});;

        res.send(posts);
    } catch (err) {
        next(err);
    }
});

postsRouter.post('/', auth, imageUpload.single('image'), async (req: RequestWithUser, res, next) => {
    try {
        const postDataMain = new Post({
            user: req.user?._id,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
        });

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