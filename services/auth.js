const bcrypt = require('bcrypt');

const UserModel = require('../models/users');
const CartModel = require('../models/cart');
const JWT = require("jsonwebtoken");

module.exports.createUser = async (userInfo) => {
    try {

        let hashedpassword = await bcrypt.hash(userInfo.password, 12);

        const newUser = new UserModel({
            fullName: userInfo.fullName,
            email: userInfo.email,
            password: hashedpassword,
            phoneNumber: userInfo.phoneNumber,
            city: userInfo.city,
            address: userInfo.address,
            isAdmin: userInfo.isAdmin,
            isDesigner: userInfo.isDesigner
        });


        const createdUser = await newUser.save();


        if (!createdUser.isAdmin && !createdUser.isDesigner) {
            // Create an empty cart for the user
            const newCart = new CartModel({
                userId: createdUser.id,
                products: []
            });

            // Save the empty cart to the database
            await newCart.save();
        }

        return createdUser;
    } catch (err) {
        console.log('Error in adding a new user', err);
        throw new Error('Could not create user');
    }
};


module.exports.doesUserExist = async (email) => {
    const existingUser = await UserModel.findOne({
        email: email
    })

    if (existingUser) {
        return true;
    } else {
        return false;
    }

};




module.exports.checkCredentials = async (email, password) => {
    try {


        const user = await UserModel.findOne({
            email: { $regex: new RegExp(email, 'i') }
        });

        let isCorrectPassword = await bcrypt.compare(password, user.password);

        if (isCorrectPassword) {
            return user;
        } else {
            return null;
        }

    } catch (err) {
        console.log('Error logging in, Please try again', err);
        throw new Error(err.message);
    }
};


module.exports.generateJWT = (user) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email
    }

    const jwtSecret = process.env.JWT_SECRET;

    try {
        let token = JWT.sign(jwtPayload, jwtSecret, { expiresIn: '1h' })
        return token;
    } catch (error) {
        throw new Error('Failure to sign in , please try again later.')
    }

};

