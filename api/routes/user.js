const router = require('express').Router();
const userManager = require('../managers/user');
const userValidations = require('../validations/user');
const crypto = require('../utils/crypto');
const getErrorDetails = require('../utils/error-details');

// API route to create new user
router.post('/signup', async (req, res) => {
    try {
        // validating incoming request body
        const error = userValidations.signup(req.body).error;
        if (error)
            return res.status(400).send(getErrorDetails(error)); // sending proper error message in case of any error

        // check if user already exists
        let user = await userManager.getByEmail(req.body.email);
        if (user)
            return res.status(400).send(`User already exists with this email.`);

        // encrypt the password
        const obj = {
            ...req.body,
            password: await crypto.hash(req.body.password)
        };

        // save user in database
        user = await userManager.create(obj);
        // return newly created user
        return res.status(200).send(user);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

// API route for login
router.post('/login', async (req, res) => {
    try {
        const error = userValidations.login(req.body).error;
        if (error)
            return res.status(400).send(getErrorDetails(error));

        const user = await userManager.getByEmail(req.body.email);
        if (!user)
            return res.status(400).send(`User does not exists with this email.`);

        const passwordMatches = await crypto.compare(req.body.password, user.password);
        if (!passwordMatches)
            return res.status(400).send(`Password did not match.`);

        return res.status(200).send(user);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

// API route to update a user
router.put('/:userId', async (req, res) => {
    try {
        const error = userValidations.update(req.body).error;
        if (error)
            return res.status(400).send(getErrorDetails(error));

        const user = await userManager.update(req.params.userId, req.body);
        return res.status(200).send(user);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

// API route to get a user by its ID
router.get(`/:userId`, async (req, res) => {
    try {
        const error = userValidations.userId(req.params).error;
        if (error)
            return res.status(400).send(getErrorDetails(error));

        const userId = req.params.userId;
        const user = await userManager.getById(userId);
        return res.status(200).send(user);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;