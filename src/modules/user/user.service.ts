import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};
const updateUserIntoDB = async (userId: string, updateDoc: TUser) => {
  const result = await User.updateOne(
    { userId },
    { $set: updateDoc },
    {
      new: true,
      runValidators: true,
    },
  );
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
