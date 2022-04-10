require('dotenv').config();
const mongoose = require('mongoose');
const adminManager = require('./managers/user');
const User = require('./models/user');
const crypto = require('./utils/crypto');
const moment = require("moment");

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

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    poolSize: 5,
    useUnifiedTopology: true
})
    .then(db => console.log('Connected with MongoDB for Seeding.'))
    .catch(err => console.log(`Unable to connect with MongoDB: ${err.message}`));

const saveAdmins = () => new Promise(async (resolve, reject) => {
    await User.deleteMany({});
    for(let i=0; i < admins.length; i++) {
        let t = admins[i];
        await adminManager.create({
            ...t,
            password: await crypto.hash(t.password)
        });
    }
    resolve();
});

(async () => {
    await saveAdmins();
    console.log('Seeding completed.\nDisconnected.');
    mongoose.disconnect();
})();    