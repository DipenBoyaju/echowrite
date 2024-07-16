import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    // return res.status(400).json({
    //   message: 'All fields are required'
    // });
    next(errorHandler(400, 'All fields are required'))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save();
    res.status(400).json({
      status: 'success',
      message: 'User Registered Successfully'
    })
  } catch (error) {
    next(error)
  }

}
