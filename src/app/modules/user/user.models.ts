import { Schema, model } from 'mongoose';
import { TOrder, TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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

// pre save middleware
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data');
  // hash pasword
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// userSchema.post('save', function (doc, next) {
//     doc.password = '';
//     next();
//   });

export const User = model<TUser>('User', userSchema);
