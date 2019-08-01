var config = require('../config');
var axios = require('axios');
var axiosInstance = axios.create({
    baseURL: config.getConfig(config.env).elasticHost,
});
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';



module.exports = axiosInstance;