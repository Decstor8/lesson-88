import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
    mongoose: {
        db: 'mongodb://localhost/reddit',
    },
    publicPath: path.join(rootPath, 'public'),
};

export default config;