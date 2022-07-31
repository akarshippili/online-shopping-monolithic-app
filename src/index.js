import express from 'express';
import config from './config/index.js';
import { connection } from './database/index.js'; 
import expressApp from './express-app.js';

const startServer = async () => {
    const app = express();
    await connection();
    expressApp(app);
    app.listen(config.port, () => {
        console.log(`Server started on port ${config.port}`);
    });
}

startServer();