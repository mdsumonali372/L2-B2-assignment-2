import { TUser } from './user.interface';
import { User } from './user.models';

const createUserIntoDB = async (user: TUser) => {
  try {
    const result = await User.create(user);
    return result;
  } catch (error) {
    console.log('Error creating user:', error);
    throw error; // Rethrow the error or handle it as needed
  }
};

const getAllUsersFromDB = async () => {
  const result = await User.aggregate([
    {
      $project: {
        userName: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  try {
    const result = await User.findOne({ userId });
    return result;
  } catch (error) {
    console.log('Error fetching single user:', error);
  }
};

const deleteUserFromDB = async (userId: string) => {
  try {
    const result = await User.deleteOne({ userId });
    return result;
  } catch (err) {
    console.log('Error fetching single user:', err);
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
