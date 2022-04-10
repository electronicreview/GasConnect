const User = require('../models/user');

const Manager = {
    getAll: async (keyword, from, to) => {
        const users = await User.find({
            $and: [
                {
                    $or: [
                        {name: {$regex: keyword, $options: 'i'}},
                        {email: {$regex: keyword, $options: 'i'}}
                    ]
                }
            ]
        }).sort({joined: -1});
        return users;
    },
    getById: async id => {
        const t = await User.findById(id);
        return t ? t : false;
    },
    getByEmail: async email => {
        const t = await User.findOne({email: email});
        return t ? t : false;
    },
    create: async t => {
        let user = new User(t);
        user = await user.save();
        return user ? user : false;
    },
    update: async (id, data) => {
        let t = await User.findByIdAndUpdate(id, {
            name: data.name,
            address: data.address
        }, {
            new: true
        });

        return t ? t : false;
    }
};

module.exports = Manager;