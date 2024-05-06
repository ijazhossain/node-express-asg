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
export const UserControllers = {
  createStudent,
  getAllStudents,
};
