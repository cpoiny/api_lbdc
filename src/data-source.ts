import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { Author } from "./entities/Author";
import { Media } from "./entities/Media";
import { Comment } from "./entities/Comment";


dotenv.config({path: ".env.local"});

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize : false,
    entities : [Post, User, Media, Author, Comment]
});
export default AppDataSource;