import {Schema, model } from 'mongoose';

const PostSchema = new Schema({
   title: {
       type: String,
       required: true,
   },
    description: String,
    image: String,
    datetime: {
       type: Date,
        required: true,
        default: () => new Date(),
    }
});

const Post = model('Post', PostSchema);
export default Post;