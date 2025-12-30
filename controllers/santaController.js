const User = require('../models/User');
const Wish = require('../models/Wish');
const Memory = require('../models/Memory');

// Submit Wish
exports.submitWish = async (req, res) => {
    try {
        const { wish } = req.body;
        const userId = req.session.userId;

        // Get Santa's memory of this user
        let memory = await Memory.findOne({ user: userId });
        let nickname = memory ? memory.nickname : 'none';

        // Get User Name
        const user = await User.findById(userId);
        const name = user.name;

        // Santa Character Logic
        let reply = "";

        switch (nickname) {
            case 'oottal':
                reply = `Ho ho ho! Veendum gift aano? ${name} mone, ninnod njan thottu! 🎅🤐`;
                break;
            case 'kudiyan':
                reply = `Ho ho ho! ${name} mone, kudiyan maru wish parayum munbe glass down cheyyu! Athu kazhinju nokkam. 🎅🧪`;
                break;
            case 'complainter':
                reply = `Ho ho ho! Veendum complaintaano? ${name} mone, ninte complaint kettu Santa's ears tired aayi! 🎅😴`;
                break;
            case 'vayadi':
                reply = `Ho ho ho! ${name} mone, vayadi kuttikk onnu nirtheettu wish parayu. Santa reply tharam! 🎅🗣️`;
                break;
            case 'nallavan':
                reply = `Ho ho ho! ${name} nallavan aaya kuttikku Santa kure gifts tharum ketto! Smart boy! 🎅🎁`;
                break;
            default:
                reply = `Ho ho ho! ${name} mone/mole, ninte wish Santa kettu. Nallonam effort edukkanam ketto! 🎅✨`;
        }


        const newWish = new Wish({
            user: userId,
            wish,
            reply
        });

        await newWish.save();
        res.render('reply', { wish: newWish });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


// Get Dashboard Data
exports.getDashboard = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });
        const wishes = await Wish.find().populate('user').sort({ createdAt: -1 });
        const memories = await Memory.find().populate('user');

        res.render('santa-dashboard', {
            users,
            wishes,
            memories,
            usersJSON: JSON.stringify(users)
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Update User Memory (Nickname/Notes)
exports.updateMemory = async (req, res) => {
    try {
        const { userId, nickname, notes } = req.body;

        let memory = await Memory.findOne({ user: userId });
        if (!memory) {
            memory = new Memory({ user: userId });
        }

        memory.nickname = nickname;
        memory.notes = notes;
        memory.lastUpdated = Date.now();

        await memory.save();
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// API: Get User Locations for Map
exports.getUserLocations = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }, 'name location');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};
