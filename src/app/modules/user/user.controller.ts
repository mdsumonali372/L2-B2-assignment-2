import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await UserServices.createUserIntoDB(userData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
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

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
};
