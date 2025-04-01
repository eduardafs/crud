import express from 'express';
import { validateData } from '../middleware/validationMiddleware';
import { userRegistrationSchema, userUpdateSchema } from '../schemas/userSchemas';
import { 
  registerUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', validateData(userRegistrationSchema), registerUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', validateData(userUpdateSchema), updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;