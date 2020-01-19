const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const respApiGit = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = respApiGit.data;
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }

        return response.json(dev);
    },
    async destroy(request, response) {
        let dev = await Dev.findOne(request.params);
        
        if (dev != null) {
            await Dev.deleteOne(dev);

            return response.json({ message: `Dev ${request.params["github_username"]} deletado com sucesso!`, status: 200 });
        }

        return response.json({ message: `Não foi encontrado o dev!`, status: 404 });
    }
};