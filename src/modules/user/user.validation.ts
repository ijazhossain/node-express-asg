import { z } from 'zod';

// Define Zod schema for user name
const userNameValidationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

// Define Zod schema for address
const addressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

// Define Zod schema for orders
const orderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number().min(0),
  quantity: z.number().min(1),
});

// Define Zod schema for user
export const userValidationSchema = z.object({
  userId: z.number().min(1),
  userName: z.string().min(1),
  password: z.string().min(1),
  fullName: userNameValidationSchema,
  age: z.number().min(1),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).default([]),
});
