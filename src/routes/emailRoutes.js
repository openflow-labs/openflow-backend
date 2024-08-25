import { Router } from 'express';
import processEmail from '../controllers/emailController.js';  // Add .js extension

const router = Router();

router.post('/upload-email', processEmail);

export { router };