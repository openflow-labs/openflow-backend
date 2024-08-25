import express, { json } from 'express';
import { router } from './routes/emailRoutes.js';

const app = express();

app.use(json());

app.use('/api/email', router);

export default app ;
