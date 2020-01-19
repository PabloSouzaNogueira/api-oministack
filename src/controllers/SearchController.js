const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        console.log("teste")
        const {latitude, longitude, techs} = request.query;
        const tehsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs:{
                $in: tehsArray
            },
            location:{
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000, //10Km
                }
            }
        });

        return response.json(devs);
    },
}