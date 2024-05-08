import { Schema, model } from 'mongoose';
import { TAddress, TOrders, TUser, TUserName } from './user.interface';
const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street name is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});
const orderSchema = new Schema<TOrders>({
  productName: { type: String, required: [true, 'product name is required'] },
  price: { type: String, required: [true, 'price is required'] },
  quantity: { type: String, required: [true, 'quantity is required'] },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: [true, 'User ID is required'] },
  userName: { type: String, required: [true, 'UserName is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: { type: userNameSchema, required: [true, 'FullName is required'] },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isActive: { type: Boolean, required: [true, 'Active Status is required'] },
  hobbies: { type: [String], required: [true, 'Hobbies are required'] },
  address: { type: addressSchema, required: [true, 'Address is required'] },
  orders: { type: [orderSchema], default: [] },
});
export const User = model<TUser>('User', userSchema);
