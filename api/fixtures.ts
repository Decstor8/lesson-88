import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";
import Post from "./models/Post";
import Comment from "./models/Comment";
const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    } catch (err) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};
const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;
    const collections = ['posts', 'users', 'comments'];
    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }
    const [user1, user2] = await User.create(
        {
            username: 'Anna',
            password: '888777',
            token: randomUUID(),
        },
        {
            username: 'Decs',
            password: '888777',
            token: randomUUID(),
        },
    );
    const [post1, post2, post3, post4] = await Post.create(
        {
            user: user1,
            title: 'Issyk Kul',
            description: 'This is description',
            image: 'images/725daa0d-8dc4-4659-9f4f-93fe7b027c4f.jpg',
            datetime: new Date(),
        },
        {
            user: user1,
            title: 'Istanbul',
            description: 'This is description',
            image: 'images/138c5cb9-567e-4fee-babc-131d55ec8364.jpeg',
            datetime: new Date(),
        },
        {
            user: user2,
            title: 'Dubai',
            description: 'This is description',
            image: 'images/ec9a48f4-dda1-4aaa-a803-e48a83430956.jpeg',
            datetime: new Date(),
        },
        {
            user: user2,
            title: 'Los Angeles',
            description: 'This is description country',
            image: 'images/ff5ec980-2d96-4638-b8d3-a7ef3407788e.jpg',
            datetime: new Date(),
        },
    );
    await Comment.create(
        {
            user: user1,
            post: post1,
            textComment: 'Stambul waves'
        },
        {
            user: user1,
            post: post1,
            textComment: 'Dubai sun'
        },
        {
            user: user1,
            post: post1,
            textComment: 'Issyk-Kul blue'
        },
        {
            user: user1,
            post: post1,
            textComment: 'LA beach'
        },
        {
            user: user1,
            post: post2,
            textComment: 'Stambul breeze'
        },
        {
            user: user1,
            post: post2,
            textComment: 'Dubai sand'
        },
        {
            user: user1,
            post: post2,
            textComment: 'Issyk-Kul cool'
        },
        {
            user: user1,
            post: post2,
            textComment: 'LA surf'
        },
        {
            user: user2,
            post: post1,
            textComment: 'Stambul sea'
        },
        {
            user: user2,
            post: post1,
            textComment: 'Dubai shore'
        },
        {
            user: user2,
            post: post1,
            textComment: 'Issyk-Kul waves'
        },
        {
            user: user2,
            post: post1,
            textComment: 'LA sun'
        },
        {
            user: user2,
            post: post2,
            textComment: 'Stambul deep'
        },
        {
            user: user2,
            post: post2,
            textComment: 'Dubai vibes'
        },
        {
            user: user2,
            post: post2,
            textComment: 'Issyk-Kul breeze'
        },
        {
            user: user2,
            post: post2,
            textComment: 'LA palms'
        },
        {
            user: user2,
            post: post3,
            textComment: 'Stambul lights'
        },
        {
            user: user2,
            post: post3,
            textComment: 'Dubai nights'
        },
        {
            user: user2,
            post: post3,
            textComment: 'Issyk-Kul clear'
        },
        {
            user: user2,
            post: post3,
            textComment: 'LA ocean'
        },
        {
            user: user1,
            post: post2,
            textComment: 'Stambul chill'
        },
        {
            user: user1,
            post: post3,
            textComment: 'Dubai heat'
        },
        {
            user: user1,
            post: post3,
            textComment: 'Issyk-Kul salt'
        },
        {
            user: user1,
            post: post3,
            textComment: 'LA vibe'
        },
        {
            user: user2,
            post: post4,
            textComment: 'Stambul coast'
        },
        {
            user: user2,
            post: post4,
            textComment: 'Dubai luxury'
        },
        {
            user: user2,
            post: post4,
            textComment: 'Issyk-Kul shore'
        },
        {
            user: user2,
            post: post4,
            textComment: 'LA sandy'
        },
        {
            user: user2,
            post: post4,
            textComment: 'Stambul dock'
        },
        {
            user: user1,
            post: post4,
            textComment: 'Dubai breeze'
        },
        {
            user: user1,
            post: post4,
            textComment: 'Issyk-Kul chill'
        },
        {
            user: user1,
            post: post4,
            textComment: 'LA pier'
        }

);

    await db.close();
};

void run();