const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const _ = require('lodash');
const {isUUID} = require('validator');

module.exports = {
    readTemplate: templateName => {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, `../templates/${templateName}.html`), 'utf8', (err, html) => {
                if(err)
                    resolve(``);

                resolve(html);
            });
        });
    },
    isValidMongooseId: id => mongoose.Types.ObjectId.isValid(id),
    isValidUUID4: id => isUUID(id, 4),
    pickUserPublicFields: user => _.pick(user, ['_id', 'name', 'email', 'password', 'phone', 'bio', 'joined', 'cityId', 'country', 'fileUrl', 'active', 'ip', 'location']),
    pickCategoryPublicFields: categories => categories.map(category => _.pick(category, ['_id', 'title'])),
    pickSubCategoryPublicFields: categories => categories.map(category => _.pick(category, ['_id', 'title'])),
    pickConditionsPublicFields: conditions => conditions.map(condition => _.pick(condition, ['_id', 'title'])),
    pickCityPublicFields: cities => cities.map(city => _.pick(city, ['_id', 'title', 'lat', 'lng'])),
    pickAdReportTypesPublicFields: types => types.map(type => _.pick(type, ['_id', 'title'])),
    pickUserReportTypesPublicFields: types => types.map(type => _.pick(type, ['_id', 'title'])),
    pickAdPublicFields: ads => ads.map(ad => _.pick(ad, ['_id', 'title'])),
};