let Observable = require('FuseJS/Observable')

let data_obs = Observable();
let data_length_obs = Observable();
let choice_data_obs = Observable();

// let current_romaji_obs = Observable();

// Default Value
let current_level_obs = Observable('N5');
let current_mode_obs = Observable('動');

let current_item_obs = Observable();
let current_choice_obs = Observable();

let current_num_obs = Observable(0);

let record_obs = Observable({word:"測り",hiragana:"はかり",meaning:"測試",correctness:true},{word:"テスト",hiragana:"テスト",meaning:"測試",correctness:false},{},{},{},{},{},{},{});

let timer_total = Observable(0);
let timer = Observable(0);
let timer_freeze = Observable();
let time_count = 20;
let time_fraction = 240/time_count; // 20 < total time count

let is_visible = Observable(false);

let is_clickable = Observable(true);

let correct_num = Observable(1);
let wrong_num = Observable(1);

let time_record_array = Observable([0,2,4,6,19,20]);

let is_pause = Observable(false);

let is_add_mode = Observable(false);

// let chart_width = Observable();

module.exports = {
	current_level_obs,
	current_mode_obs,
	current_item_obs,
	current_choice_obs,
	// current_romaji_obs,
	timer_total,
	timer,
	timer_freeze,
	time_count,
	time_fraction,
	is_visible,
	data_obs,
	data_length_obs,
	choice_data_obs,
	current_num_obs,
	is_clickable,
	correct_num,
	wrong_num,
	time_record_array,
	record_obs,
	is_pause,
	is_add_mode
}