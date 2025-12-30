const express = require('express');
const hbs = require('hbs');
const path = require('path');
const session = require('express-session');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Connect to Database
connectDB();

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session Management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Expose User to Templates
app.use((req, res, next) => {
    res.locals.user = req.session.userId;
    res.locals.userName = req.session.name;
    res.locals.role = req.session.role;
    next();
});


// HBS Setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Basic Routes (To be expanded)
app.use('/', require('./routes/userRoutes'));
app.use('/admin', require('./routes/santaRoutes'));

// Socket.io Logic
const users = {}; // Map socket IDs to user IDs

io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    socket.on('join', (userId) => {
        users[userId] = socket.id;
        console.log(`User ${userId} joined with socket ${socket.id}`);
    });

    socket.on('sendMessage', async ({ senderId, receiverId, text, role }) => {
        console.log(`Message from ${senderId} to ${receiverId}: ${text}`);

        // Save to DB (Optional, but good for persistence)
        // const Chat = require('./models/Chat');
        // ... logic to find or create chat and push message

        const receiverSocketId = users[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('message', { senderId, text, role });
        }

        // If user sends to santa (admin), all santa sockets should ideally see it
        // For simplicity, we assume one santa logged in or role-based broadcast
        if (receiverId === 'santa') {
            socket.broadcast.emit('santaMessage', { senderId, text });
        }
    });

    socket.on('disconnect', () => {
        // Clean up users mapping
        for (const [uid, sid] of Object.entries(users)) {
            if (sid === socket.id) {
                delete users[uid];
                break;
            }
        }
    });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`zigSanta server running on port ${PORT}`));
