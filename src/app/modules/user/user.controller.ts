import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { userValidationSchema } from './user.validation';

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

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { userId } = req.params;
    const result = await UserServices.updateUserFromDb(userId, userData);
    res.status(200).json({
      success: true,
      message: 'User update successfully!',
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

const addUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { productName, price, quantity } = req.body;
    const newOrder = {
      productName,
      price,
      quantity,
    };

    const result = await UserServices.addUserOrderFromDB(userId, newOrder);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  }
};

const getUserOrderData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await UserServices.getUserOrderUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders. Please try again later.',
    });
  }
};

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
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addUserOrder,
  getUserOrderData,
  getCalculateTotaPriceOrders,
};
