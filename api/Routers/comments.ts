import {Router} from "express";
import Comment from "../models/Comment";
import auth, {RequestWithUser} from "../middleware/auth";

const commentsRouter = Router();

commentsRouter.get('/', async (req, res, next) => {
    try {
        const postId = req.query.post as string;
        const result = await Comment.find({post: postId});
        return res.send(result);
    } catch (err) {
        next(err);
    }
});

commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
    try {
        const comment = new Comment({
            user: req.user?._id,
            post: req.body.post,
            textComment: req.body.textComment,
        });

        await comment.save();
        return res.send(comment);
    } catch (err) {
        next(err);
    }
});

export default commentsRouter;