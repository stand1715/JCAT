let Observable = require('FuseJS/Observable')

let colors = [
	// {"color": "Pink", "color_code": "#fc94ff"},
	{"color": "Red", "color_code": "#b00007"},
	{"color": "Purple", "color_code": "#a702b1"},
	{"color": "Brown", "color_code": "#b07e01"},
	{"color": "Yellow", "color_code": "#ada000"},
	{"color": "Green", "color_code": "#01b13a"},
	{"color": "PaleBlue", "color_code": "#00afa0"},
	{"color": "Blue", "color_code": "#0181b0"}
];

let current_color = Observable("Blue");
// let current_color_code = Observable("#0181b0");
let bg_path = Observable("app/assets/Blue.png")

let isColorChanged = Observable(false);

let is_info = Observable(false);

let is_notes = Observable(true);

module.exports = {
	colors,
	current_color,
	bg_path,
	isColorChanged,
	is_info,
	is_notes
	// current_color_code
}