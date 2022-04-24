const router = require('express').Router();
const stationManager = require('../managers/station');
const stationValidations = require('../validations/station');
const getErrorDetails = require('../utils/error-details');

// API route to create new station
router.post('/', async (req, res) => {
    try {
        // validating incoming request
        const error = stationValidations.create(req.body).error;
        if (error)
            return res.status(400).send(getErrorDetails(error)); // return error message in case of any error

        // call manager method to create new station object in DB
        const station = await stationManager.create(req.body);
        // send ID of newly created object
        return res.status(200).send(station._id);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

// API route to update a station
router.put('/:stationId', async (req, res) => {
    try {
        // validating incoming request
        const error = stationValidations.update(req.body).error;
        if (error)
            return res.status(400).send(getErrorDetails(error)); // return error message in case of any error

        // call manager method to update station object in DB
        const station = await stationManager.update(req.params.stationId, req.body);
        // send ID of updated object
        return res.status(200).send(station._id);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

// API route to fetch all stations
router.post(`/all`, async (req, res) => {
    try {
        const stations = await stationManager.getAll(req.body.keyword);
        return res.status(200).send(stations);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

// API route to delete a station by its ID
router.delete('/:stationId', async (req, res) => {
    try {
        const error = stationValidations.stationId(req.params).error;
        if (error)
            return res.status(400).send(getErrorDetails(error));

        const result = await stationManager.delete(req.params.stationId);
        return res.status(200).send(result);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;