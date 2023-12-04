const UserModel = require('../models/users');

module.exports.findAllUsers = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (err) {
    throw new Error('Could not retrieve users');
  }
};

// module.exports.addNewUser = async (userInfo) => {
//   try {
//     const user = new UserModel(userInfo);
//     const createdUser = await user.save();
//     return createdUser;
//   } catch (err) {
//     console.log('Error in adding a new user', err);
//     throw new Error('Could not create user');
//   }
// };

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
