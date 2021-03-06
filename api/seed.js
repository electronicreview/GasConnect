require('dotenv').config();
const mongoose = require('mongoose');
const adminManager = require('./managers/user');
const User = require('./models/user');
const crypto = require('./utils/crypto');
const moment = require("moment");

// array of users want to save as Admins
const admins = [
    {
        "name": "Admin",
        "email": "admin@gas-connect.com",
        "password": "admin",
        "status": "admin",
        "address": "",
        "joined": moment().format()
    }
];

// connecting with database
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    poolSize: 5,
    useUnifiedTopology: true
})
    .then(db => console.log('Connected with MongoDB for Seeding.'))
    .catch(err => console.log(`Unable to connect with MongoDB: ${err.message}`));

// method that will be used to save Admin users in the database
const saveAdmins = () => new Promise(async (resolve, reject) => {
    // emptying database first
    await User.deleteMany({});
    // looping through all users and saving in DB
    for(let i=0; i < admins.length; i++) {
        let t = admins[i];
        // calling manager method to save it
        await adminManager.create({
            ...t,
            password: await crypto.hash(t.password) // hashing password
        });
    }
    resolve();
});

// starting the logic in this file
(async () => {
    await saveAdmins();
    console.log('Seeding completed.\nDisconnected.');
    mongoose.disconnect();
})();    