import { TUser } from './user.interface';
import { User } from './user.models';

// create user from DB
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

// get all user from DB
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
// get sigle user from DB
const getSingleUserFromDB = async (userId: number) => {
  try {
    const result = await User.findOne(
      { userId },
      {
        password: false,
        orders: false,
      },
    );
    return result;
  } catch (error) {
    console.log('Error fetching single user:', error);
  }
};
// update user from DB
const updateUserFromDb = async (userId: number, updatedUserData: TUser) => {
  try {
    const filter = { userId: userId };
    console.log('userData:', updatedUserData);
    const updatedUser = await User.findOneAndUpdate(filter, updatedUserData, {
      new: true,
      projection: { password: false },
      runValidators: true,
    });

    return updatedUser;
  } catch (err) {
    console.log(err);
  }
};
// delete user from DB
const deleteUserFromDB = async (userId: number) => {
  try {
    const result = await User.deleteOne({ userId });
    return result;
  } catch (err) {
    console.log('Error fetching single user:', err);
  }
};
// add user order from DB
const addUserOrderFromDB = async (userId: number, orderData: any) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found.');
    }

    if (!user.orders) {
      user.orders = [];
    }

    const newOrder = {
      productName: orderData.productName,
      price: orderData.price,
      quantity: orderData.quantity,
    };

    user.orders.push(newOrder);
    await user.save();

    return user;
  } catch (error) {
    console.error(error);
    throw new Error('User Not Found');
  }
};
// get user order from DB
const getUserOrderUserFromDB = async (userId: number) => {
  try {
    const result = await User.findOne(
      { userId },
      { _id: 0, password: 0, __v: 0 },
    ).select('orders');

    if (!result) {
      throw new Error('User not found.');
    }

    return result.orders;
  } catch (error) {
    console.log('Error fetching user orders:', error);
    throw error;
  }
};
// calculate order from DB
const getCalculateTotalPriceFromDB = async (userId: number) => {
  try {
    const totalPricePipeline = [
      { $match: { userId } },
      { $unwind: '$orders' },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalPrice: 1,
        },
      },
    ];

    const totalPriceResult = await User.aggregate(totalPricePipeline);

    let totalPriceValue = 0;
    if (totalPriceResult.length !== 0) {
      totalPriceValue = totalPriceResult[0].totalPrice;
    }
    const convertFixed = totalPriceValue.toFixed(2);

    return {
      totalPrice: parseFloat(convertFixed),
    };
  } catch (error) {
    console.log('Error calculating total price:', error);
    throw error;
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDb,
  deleteUserFromDB,
  addUserOrderFromDB,
  getUserOrderUserFromDB,
  getCalculateTotalPriceFromDB,
};
