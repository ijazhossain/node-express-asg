import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  const { user: userData } = req.body;
  const result = await UserServices.createUserIntoDB(userData);
  res.status(200).json({
    success: true,
    message: 'User is created successfully',
    data: result,
  });
};
const getAllStudents = async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDB();
  res.status(200).json({
    success: true,
    message: 'All users retrieved  successfully',
    data: result,
  });
};
const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserFromDB(userId);
  res.status(200).json({
    success: true,
    message: 'User is retrieved  successfully',
    data: result,
  });
};
const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updateDoc = req.body;
  const result = await UserServices.updateUserIntoDB(userId, updateDoc);
  res.status(200).json({
    success: true,
    message: 'User is updated successfully',
    data: result,
  });
};
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(userId);
  const result = await UserServices.deleteUserFromDB(userId);
  res.status(200).json({
    success: true,
    message: 'User is deleted successfully',
    data: result,
  });
};
export const UserControllers = {
  createStudent,
  getAllStudents,
  getSingleUser,
  updateUser,
  deleteUser,
};
