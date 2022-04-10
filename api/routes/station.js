const router = require('express').Router();
const stationManager = require('../managers/station');
const stationValidations = require('../validations/station');
const getErrorDetails = require('../utils/error-details');

router.post('/', async (req, res) => {
    try {
        const error = stationValidations.create(req.body).error;
        if (error)
            return res.status(400).send(getErrorDetails(error));

        const station = await stationManager.create(req.body);
        return res.status(200).send(station._id);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.put('/:stationId', async (req, res) => {
    try {
        const error = stationValidations.update(req.body).error;
        if (error)
            return res.status(400).send(getErrorDetails(error));

        console.log(req.body);
        const station = await stationManager.update(req.params.stationId, req.body);
        return res.status(200).send(station._id);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post(`/all`, async (req, res) => {
    try {
        const stations = await stationManager.getAll(req.body.keyword);
        return res.status(200).send(stations);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

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