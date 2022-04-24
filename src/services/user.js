import axios from 'axios';
import utils from "../utils/utils";
import constants from '../utils/constants';

// All API calls for users
export default class {

    static getById = async userId => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${constants.API_URL}/users/${userId}`)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static login = async (email, password) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            email: email,
            password: password
        };

        await axios.post(`${constants.API_URL}/users/login`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static signup = async (name, email, password) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            name: name,
            email: email,
            password: password
        };

        await axios.post(`${constants.API_URL}/users/signup`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static update = async (id, name, address) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            name, address
        };

        await axios.put(`${constants.API_URL}/users/${id}`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }
}
