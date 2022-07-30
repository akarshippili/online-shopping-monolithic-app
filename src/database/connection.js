import mongoose from "mongoose";
import config from '../config/index.js';

export default async () => {
    try {
        await mongoose.connect(config.dbUrl, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log("Database connected successfully");
    } catch (e) {
        console.log(e);
        console.log("could not connect");
    }
}