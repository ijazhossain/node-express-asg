import { Router } from 'express';
import { UserControllers } from './user.controller';
const router = Router();
router.post('/users', UserControllers.createStudent);
router.get('/users', UserControllers.getAllStudents);
export const UserRouters = router;
