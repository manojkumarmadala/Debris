var configurations = require('./config.json');

let env = configurations.currentEnv;
var getConfig=function() {
	if(env==='development'){
		return configurations.environments.development;
	}
	else if(env==='stage'){
		return configurations.environments.stage;
	}
	else if(env==='production'){
		return configurations.environments.production;
	}
	else
		return null;
};

module.exports = {
	env,
	getConfig
};
