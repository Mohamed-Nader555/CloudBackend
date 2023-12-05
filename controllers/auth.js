const authService = require('../services/auth');
const { validationResult } = require('express-validator');

module.exports.signUpUser = async (req, res) => {

    const validationErrors = validationResult(req).array();
    if(validationErrors.length > 0){
        const firstError = validationErrors[0];
        return res.status(422).send({
            message:firstError.msg
        });
    }


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

        const userExist = await authService.doesUserExist(req.body.email);
        if (userExist) {
            return res.status(422).send({
                error: "Email already exist"
            });
        }


        const createdUser = await authService.createUser(userInfo);
        return res.status(201).send({
            msg: 'User created successfully',
            userId: createdUser._id,
        });
    } catch (err) {
        return res.status(500).send({
            error: err.message || 'Could not create user',
        });
    }
};


module.exports.loginUser = async (req, res) => {

    const {email, password} = req.body;

    try {

        const user = await authService.checkCredentials(email, password);
        if (!user) {
            return res.status(422).send({
                error: "Invalid Credentials"
            });
        }


        const jwt = await authService.generateJWT(user);
        return res.status(201).send({   
            jwt: jwt,
            msg: 'Logged in successfully',
            email: user.email,
            admin: user.isAdmin,
            designer: user.isDesigner,
            _id: user._id
        });
    } catch (err) {
        return res.status(500).send({
            error: err.message || 'Cannot Login, There is an error ',
        });
    }
};