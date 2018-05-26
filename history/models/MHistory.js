let Observable = require('FuseJS/Observable');

let data_obs = Observable();

let is_level_active_obs = Observable([true,true,true,true,true]);

let is_mode_active_obs = Observable([true,true,true]);

let is_long_pressed_obs = Observable(false);

let current_word_obs = Observable();

module.exports = {
	data_obs,
	is_level_active_obs,
	is_mode_active_obs,
	is_long_pressed_obs,
	current_word_obs
}