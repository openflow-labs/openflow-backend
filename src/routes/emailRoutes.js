import { Router } from 'express';
import processEmail from '../controllers/emailController.js';

const router = Router();

router.post('/upload-email', processEmail);

export { router };