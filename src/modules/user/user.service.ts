import { TOrders, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw Error('User already exists!');
  }
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
  if (!(await User.isUserExists(userId))) {
    throw new Error('User does not exists!');
  }
  const result = await User.findOne({ userId }).select({
    password: 0,
    orders: 0,
    _id: 0,
    __v: 0,
  });
  return result;
};
const updateUserIntoDB = async (userId: string, updateDoc: TUser) => {
  if (!(await User.isUserExists(userId))) {
    throw Error('User does not exists!');
  }
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
  if (!(await User.isUserExists(userId))) {
    throw Error('User does not exists!');
  }
  const result = await User.updateOne({ userId }, { isActive: false });
  return result;
};
const addNewProductInOrderInDB = async (
  userId: string,
  newProduct: TOrders,
) => {
  if (!(await User.isUserExists(userId))) {
    throw Error('User does not exists!');
  }
  const result = await User.updateOne(
    { userId },
    { $addToSet: { orders: newProduct } },
  );
  return result;
};
const getAllOrdersFromDB = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw Error('User does not exists!');
  }
  const result = await User.findOne({ userId }).select({
    orders: 1,
    _id: 0,
  });
  return result;
};
const getTotalPriceFromDB = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw Error('User do not exists!');
  }
  const user = await User.findOne({ userId });
  const totalPrice = user?.orders
    ?.reduce((acc, order) => acc + order.quantity * order.price, 0)
    .toFixed(2);
  return Number(totalPrice);
};
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addNewProductInOrderInDB,
  getAllOrdersFromDB,
  getTotalPriceFromDB,
};
