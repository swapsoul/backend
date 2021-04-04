const User = require('../models/userModel');

exports.welcome = async (req, res) => {
    res.json({
        message: 'Auth Works.'
    });
};

exports.login = async (req, res) => {
    console.log('Login Method');
    User.findOne({
        $or: [
            { userName: req.body.usernameOrEmail },
            { userEmail: req.body.usernameOrEmail }
        ]
    }, {phoneNumber: 1, userEmail: 1, userName: 1, verificationStatus: 1}, function (err, user) {
        if (err) {
            res.status(404).json({
                message: 'User Not Found'
            });
        } else if (user) {
            res.json({
                message: 'User Details',
                data: user.toJSON()
            });
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            })
        }
    });
};

// exports.signup = async (req, res) => {
//     console.log('Signup Method');
//     res.json({
//         message: 'Signup works'
//     });
// };
