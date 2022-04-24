const bcrypt = require('bcryptjs');

// separate methods to encrypt or decrypt users password
module.exports = {
    hash: async pass => {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(pass, salt);
        return hashed; // return encrypted password
    },
    compare: async (pass, hashedPassword) => {
        const result = await bcrypt.compare(pass, hashedPassword); // check if password matches an encrypted password
        return result; // return true/false
    }
}