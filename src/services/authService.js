exports.welcome = async (req, res) => {
    res.json({
        message: 'Auth Works.'
    });
};

exports.login = async (req, res) => {
    console.log('Login Method');
    res.json({
        message: 'Login works'
    });
};

// exports.signup = async (req, res) => {
//     console.log('Signup Method');
//     res.json({
//         message: 'Signup works'
//     });
// };
