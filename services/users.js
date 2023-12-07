const UserModel = require('../models/users');

module.exports.findAllUsers = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (err) {
    throw new Error('Could not retrieve users');
  }
};


module.exports.updateUserById = async (userId, userInfo) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, userInfo, { new: true });
    return updatedUser;
  } catch (err) {
    console.log('Error in updating user by id', err);
    throw new Error('Could not update user');
  }
};

module.exports.deleteUserById = async (userId) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    return deletedUser;
  } catch (err) {
    console.log('Error in deleting user by id', err);
    throw new Error('Could not delete user');
  }
};


module.exports.findUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (err) {
    console.log('Error in finding user by id', err);
    throw new Error('Could not find user');
  }
};