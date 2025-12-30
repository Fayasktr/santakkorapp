const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, lat, lng } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.send('User already exists');

        user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            location: {
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)]
            }
        });

        await user.save();
        req.session.userId = user._id;
        req.session.name = user.name;
        req.session.role = user.role;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.send('Invalid Credentials');
        }

        req.session.userId = user._id;
        req.session.name = user.name;
        req.session.role = user.role;

        if (user.role === 'santa') {
            res.redirect('/admin/dashboard');
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Logout
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

// Auth Middlewares
exports.isAuth = (req, res, next) => {
    if (req.session.userId) return next();
    res.redirect('/login');
};

exports.isSanta = (req, res, next) => {
    if (req.session.role === 'santa') return next();
    res.redirect('/');
};
