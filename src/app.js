import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';
import router from './routes/index.js';

const app = express();
app.use(express.json());
app.use(router);

mongoose.connect(config.mongoUrl)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.error(err));

export default app;