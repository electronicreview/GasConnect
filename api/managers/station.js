const Station = require('../models/station');

// object that will contain all DB operation methods related to station
const Manager = {
    // get all stations by search keyword
    getAll: async keyword => {
        const stations = await Station.aggregate([
            {
                $match: {
                    $or: [
                        { title: { $regex: keyword, $options: 'i' } },
                        { address: { $regex: keyword, $options: 'i' } },
                    ]
                }
            },
            {
                $lookup: {
                    from: `users`,
                    localField: `userId`,
                    foreignField: `_id`,
                    as: `user`
                }
            }
        ])
            .unwind('user')
            .sort({ dateUpdated: -1 }); // sorting by date

        return stations;
    },

    // create new station
    create: async t => {
        let station = new Station(t);
        station = await station.save();
        return station ? station : false;
    },

    // update the price and date
    update: async (stationId, data) => {
        let t = await Station.findByIdAndUpdate(stationId, {
            price: data.price,
            userId: data.userId,
            dateUpdated: data.dateUpdated
        }, {
            new: true
        });
        return t ? t : false;
    },

    // delete a station
    delete: async id => {
        let t = await Station.findByIdAndDelete(id);
        return t ? true : false;
    }
};

module.exports = Manager;