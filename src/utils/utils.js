
import moment from "moment";

// some helpful methods to be used project-wide
export default class {
    
    static bytesToSize = bytes => {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    static monthYearFormat = date => moment(date).format('MMM YYYY')
    
    static dayMonthYearFormat = date => moment(date).format('DD MMM YYYY')

    static formatToCurrency = num => {
        return parseFloat(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(".00", "");
    }
}