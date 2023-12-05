import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { userValidationSchema } from './user.validation';

// create user from controller
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const zodValidationData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodValidationData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      data: err,
    });
  }
};
// get all user form controller
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      data: err,
    });
  }
};
// get single user from controller
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error fetching user.',
    });
  }
};
// update user from controller
const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    console.log('req body', req.body);
    const { userId } = req.params;
    const result = await UserServices.updateUserFromDb(
      Number(userId),
      userData,
    );
    res.status(200).json({
      success: true,
      message: 'User update successfully!',
      data: result,
    });
    console.log('result:', result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error fetching user.',
    });
  }
};
// delete user from controller
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deletd successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'User not found',
    });
  }
};
// add user order from controller
const addOrderToUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const orders = req.body.orders;
  if (!orders || orders.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please provide at least one order.',
    });
  }

  try {
    const { productName, price, quantity } = orders[0];

    if (!productName || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide productName, price, and quantity for the order.',
      });
    }

    const orderData = { productName, price, quantity };
    const user = await UserServices.addUserOrderFromDB(userId, orderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: user.orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get user data from controller
const getUserOrderData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await UserServices.getUserOrderUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: orders,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders. Please try again later.',
    });
  }
};
// calculate order price from controller
const getCalculateTotaPriceOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getCalculateTotalPriceFromDB(
      Number(userId),
    );
    console.log('result price', result);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders. Please try again later.',
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrderToUser,
  getUserOrderData,
  getCalculateTotaPriceOrders,
};
