const userService = require('../services/users');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    res.send({ users });
  } catch (err) {
    console.log('Error in getting all users', err);
    res.status(500).send({ error: 'Internal Server Error', err });
  }
};


module.exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const userInfo = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city,
    address: req.body.address,
    isAdmin: req.body.isAdmin || false,
    isDesigner: req.body.isDesigner || false,
  };

  try {
    const updatedUser = await userService.updateUserById(userId, userInfo);
    if (updatedUser === null) {
      return res.status(404).send({ error: 'User not found' });
    }
    return res.status(200).send({
      msg: 'User updated successfully',
      userId: updatedUser._id,
    });
  } catch (err) {
    console.log('Error in updating the user', err);
    res.status(500).send({ error: 'Internal Server Error', err });
  }
};

module.exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await userService.deleteUserById(userId);
    if (deletedUser === null) {
      return res.status(404).send({ error: 'User not found' });
    }
    return res.status(200).send({
      msg: 'User deleted successfully',
      userId: deletedUser._id,
    });
  } catch (err) {
    console.log('Error in deleting the user', err);
    res.status(500).send({ error: 'Internal Server Error', err });
  }
};


module.exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userService.findUserById(userId);
    if (user === null) {
      return res.status(404).send({ error: 'User not found' });
    }
    return res.status(200).send({
      user,
    });
  } catch (err) {
    console.log('Error in getting the user by id', err);
    res.status(500).send({ error: 'Internal Server Error', err });
  }
};