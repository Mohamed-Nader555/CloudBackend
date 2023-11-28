const {check} = require('express-validator');

module.exports.validateNewUser = () => {
    const validationMiddlewares = [
        check("fullName").notEmpty().withMessage("fullName Cannot be empty"),
        check("email").isEmail().withMessage("Email is invlid."),
        check("email").notEmpty().withMessage("Email Cannot be empty"),
        check("password").notEmpty().withMessage("password Cannot be empty"),
        check("password").isLength({min: 3, max: 10}).withMessage("password must be at least 3 characters long and max 10 "),
        check("city").notEmpty().withMessage("city Cannot be empty"),
        check("phoneNumber").notEmpty().withMessage("phoneNumber Cannot be empty"),
        check("phoneNumber").isLength({max: 11}).withMessage("Phone is invalid, must ne 11 characters"),
        check("address").notEmpty().withMessage("address Cannot be empty")
    ];

    return validationMiddlewares
};