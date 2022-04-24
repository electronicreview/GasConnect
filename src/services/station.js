import axios from 'axios';
import utils from "../utils/utils";
import constants from '../utils/constants';
import moment from "moment";

// All API calls for stations

export default class {

    static getAll = async keyword => {
        let result = {
            data: null,
            error: null
        };

        await axios.post(`${constants.API_URL}/stations/all`, {keyword})
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

    static create = async (userId, title, address, price) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            title, address, price, userId,
            dateUpdated: moment().format()
        };

        await axios.post(`${constants.API_URL}/stations/`, data)
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

    static update = async (stationId, price, userId) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            price, 
            userId,
            dateUpdated: moment().format()
        };

        await axios.put(`${constants.API_URL}/stations/${stationId}`, data)
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

    static delete = async stationId => {
        let result = {
            data: null,
            error: null
        };

        await axios.delete(`${constants.API_URL}/stations/${stationId}`)
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
