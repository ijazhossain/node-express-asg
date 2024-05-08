import { Router } from 'express';
import { UserControllers } from './user.controller';
const router = Router();
router.post('/', UserControllers.createStudent);
router.get('/', UserControllers.getAllStudents);
router.get('/:userId', UserControllers.getAllStudents);
router.put('/:userId', UserControllers.updateUser);
router.delete('/:userId', UserControllers.deleteUser);
export const UserRouters = router;
