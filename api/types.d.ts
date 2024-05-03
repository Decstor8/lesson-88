import {Model} from "mongoose";

export interface UserTypes {
    username: string;
    password: string;
    token: string;
}

export interface PostTypes {
    title: string;
    description: string;
    image: string | null;
    }

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
 }

 type UserModel = Model<UserTypes, {}, UserMethods>;
