import { Router } from 'express';
import { UserControllers } from './user.controller';
const router = Router();
router.post('/', UserControllers.createStudent);
router.get('/', UserControllers.getAllStudents);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateUser);
router.delete('/:userId', UserControllers.deleteUser);
router.put('/:userId/orders', UserControllers.addNewProductInOrder);
router.get('/:userId/orders', UserControllers.getAllOrders);
router.get('/:userId/orders/total-price', UserControllers.getTotalPrice);

export const UserRouters = router;
