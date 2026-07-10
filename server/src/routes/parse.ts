import { Router } from 'express';
import { parseDependencies } from '../controllers/parseController';

const router = Router();

router.post('/parse', parseDependencies);

export default router;
