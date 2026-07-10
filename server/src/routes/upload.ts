import { Router } from 'express';
import { uploadProject } from '../controllers/uploadController';

const router = Router();

router.post('/upload', uploadProject);

export default router;
