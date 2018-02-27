let m_app = require ('app/models/MApp'); 
let Timer = require("FuseJS/Timer");

function h_color_change(args){
	console.log(args.data.color_code);

	// m_app.current_color_code.value = args.data.color_code;
	m_app.current_color.value = args.data.color;
	m_app.isColorChanged.value = true;

	Timer.create(function() {
	   	m_app.bg_path.value = "app/assets/" + args.data.color + ".png";
	}, 500, false);

}

module.exports={
	h_color_change
}