import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { customer, product, shopping } from './apis/index.js';

export default (app) => {

    //middleware
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));

    //routes
    app.get('/test', (req, res) => {
        res.json('Hello World!');
    });

    //api
    customer(app);
    product(app);
    shopping(app);
};