import express from 'express';
import config from './config/index.js';

const startServer = () => {
    const app = express();
    app.listen(config.port, () => {
        console.log(`Server started on port ${config.port}`);
    });
}

startServer();