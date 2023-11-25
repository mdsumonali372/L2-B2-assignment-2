import { z } from 'zod';

const addressValidationSchema = z.object({
  street: z.string().nonempty(),
  city: z.string().nonempty(),
  country: z.string().nonempty(),
});

const orderValidationSchema = z.object({
  productName: z.string().nonempty(),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

// Define an object schema for the user
export const userValidationSchema = z.object({
  userId: z.number().int().positive(),
  userName: z.string().nonempty(),
  password: z.string().nonempty(),
  fullName: z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
  }),
  age: z.number().positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema),
});
