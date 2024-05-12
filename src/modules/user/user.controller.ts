/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { userValidationSchema } from './user.validation';

const createStudent = async (req: Request, res: Response) => {
  const { user: userData } = req.body;
  const zodParseData = userValidationSchema.parse(userData);
  const result = await UserServices.createUserIntoDB(zodParseData);
  const resultObject = result.toObject();

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { orders, _id, password, __v, ...responseWithoutOrders } = resultObject;
  res.status(200).json({
    success: true,
    message: 'User is created successfully',
    data: responseWithoutOrders,
  });
};
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'All users retrieved  successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to fetch user data',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User is retrieved  successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to fetch user data',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateDoc = req.body;
    const result = await UserServices.updateUserIntoDB(userId, updateDoc);

    res.status(200).json({
      success: true,
      message: 'User is updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to fetch user data',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User is deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to fetch user data',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};
const addNewProductInOrder = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;
    const { userId } = req.params;
    const result = await UserServices.addNewProductInOrderInDB(
      userId,
      newProduct,
    );
    res.status(200).json({
      success: true,
      message: 'User is deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to fetch user data',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};
export const UserControllers = {
  createStudent,
  getAllStudents,
  getSingleUser,
  updateUser,
  deleteUser,
  addNewProductInOrder,
};
