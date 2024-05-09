import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await User.find().select({
    password: 0,
    orders: 0,
    _id: 0,
    __v: 0,
  });
  return result;
};
const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId }).select({
    password: 0,
    orders: 0,
    _id: 0,
    __v: 0,
  });
  return result;
};
const updateUserIntoDB = async (userId: string, updateDoc: TUser) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $set: updateDoc },
    {
      new: true,
      runValidators: true,
    },
  ).select({
    password: 0,
    orders: 0,
    _id: 0,
    __v: 0,
  });
  return result;
};
const deleteUserFromDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isActive: false });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
