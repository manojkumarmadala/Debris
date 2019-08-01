import axios from 'axios';
import { getConfig } from '../configurations/config';

let configurations = getConfig();

var axiosInstance = axios.create({
	baseURL: configurations.apiServer + configurations.apiBasePath,
	/* other custom settings */
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosInstance;