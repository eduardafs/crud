import { Request, Response } from 'express';
import * as userModel from '../models/userModel';
import { StatusCodes } from 'http-status-codes';

// export const registerUser = (req: Request, res: Response) => {
//   res.json({ message: 'User registered successfully', data: req.body });
// };

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const existingUser = await userModel.getUserByEmail(req.body.email);

    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        error: 'User already exists',
        message: 'A user with this email already exists'
      });
    }
    
    const newUser = await userModel.createUser(req.body);
    
    const { ...userToReturn } = newUser;
    
    return res.status(StatusCodes.CREATED).json({
      message: 'User registered successfully',
      data: userToReturn
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
      message: 'An error occurred while registering the user'
    });
  }
};

export const getUsers = async (_req: Request, res: Response): Promise<any> => {
  try {
    const users = await userModel.getAllUsers();
    return res.status(StatusCodes.OK).json({ data: users });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching users'
    });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'User not found',
        message: 'No user found with the provided ID'
      });
    }
    return res.status(StatusCodes.OK).json({ data: user });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
      message: 'An error occurred while fetching the user'
    });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const success = await userModel.updateUser(req.params.id, req.body);
    if (!success) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'User not found',
        message: 'No user found with the provided ID'
      });
    }
    
    const updatedUser = await userModel.getUserById(req.params.id);
    return res.status(StatusCodes.OK).json({
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
      message: 'An error occurred while updating the user'
    });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const success = await userModel.deleteUser(req.params.id);
    if (!success) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'User not found',
        message: 'No user found with the provided ID'
      });
    }
    return res.status(StatusCodes.OK).json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
      message: 'An error occurred while deleting the user'
    });
  }
};