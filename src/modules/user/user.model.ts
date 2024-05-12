import { Query, Schema, model } from 'mongoose';
import {
  TAddress,
  TOrders,
  TUser,
  TUserName,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config';
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
  price: { type: Number, required: [true, 'price is required'] },
  quantity: { type: Number, required: [true, 'quantity is required'] },
});

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, 'UserName is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: { type: userNameSchema, required: [true, 'FullName is required'] },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isActive: { type: Boolean, required: [true, 'Active Status is required'] },
  hobbies: { type: [String], required: [true, 'Hobbies are required'] },
  address: { type: addressSchema, required: [true, 'Address is required'] },
  orders: { type: [orderSchema], default: [] },
});
// static method to check the user existence
userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

// middleware to bcrypt password field
userSchema.pre('save', async function (next) {
  //   console.log(this);
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
// middleware to hide password field
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// middleware to hide deleted user
userSchema.pre(/^find/, function (this: Query<TUser, Document>, next) {
  this.find({ isActive: { $eq: true } });
  next();
});

export const User = model<TUser, UserModel>('User', userSchema);
