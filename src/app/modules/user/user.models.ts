import { Schema, model } from 'mongoose';
import { TOrder, TUser } from './user.interface';

const orderSchema = new Schema<TOrder>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], default: [] },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [orderSchema],
});

export const User = model<TUser>('User', userSchema);
