let Observable = require('FuseJS/Observable');

let data_obs = Observable();

let is_level_active_obs = Observable([true,true,true,true,true]);

let is_mode_active_obs = Observable([true,true,true]);

module.exports = {
	data_obs,
	is_level_active_obs,
	is_mode_active_obs
}