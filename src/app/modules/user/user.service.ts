import { TUser } from './user.interface';
import { User } from './user.models';

// const createUserIntoDB = async (user: TUser) => {
//   try {
//     const result = await User.create(user);
//     return result;
//   } catch (error) {
//     console.log('Error creating user:', error);
//     throw error;
//   }
// };

const createUserIntoDB = async (user: TUser) => {
  try {
    const result = await User.create(user);
    const projection = { password: false };
    const createdUserWithoutPassword = await User.findOne(
      { _id: result._id },
      projection,
    );
    return createdUserWithoutPassword;
  } catch (error) {
    console.log('Error creating user:', error);
    throw error;
  }
};

const getAllUsersFromDB = async () => {
  const result = await User.aggregate([
    {
      $project: {
        _id: false,
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

const getSingleUserFromDB = async (userId: number) => {
  try {
    const result = await User.findOne(
      { userId },
      {
        _id: false,
        password: false,
        orders: false,
      },
    );
    return result;
  } catch (error) {
    console.log('Error fetching single user:', error);
  }
};

const deleteUserFromDB = async (userId: number) => {
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
