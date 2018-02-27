let Storage = require("FuseJS/Storage");

let m_history = require ('history/models/MHistory');

let noun_record = [];
let adj_record = [];
let verb_record = [];

let record = [];

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function delete_record(){

	console.log(" -- delete_record --");
	for (let i = 1; i <= 5; i++){

		Storage.deleteSync("N" + i + "動" + ".txt");
		Storage.deleteSync("N" + i + "形" + ".txt");
		Storage.deleteSync("N" + i + "名" + ".txt");
	}
}

function read_record(){

	for (let i = 1; i <= 5; i++){

		// console.log("[read]" + "N" + i + "動" + ".txt");
		verb_record[i-1] = Storage.readSync("N" + i + "動" + ".txt");
		adj_record[i-1] = Storage.readSync("N" + i + "形" + ".txt");
		noun_record[i-1] = Storage.readSync("N" + i + "名" + ".txt");

		if (IsJsonString(verb_record[i-1])){
			verb_record[i-1] = JSON.parse(verb_record[i-1]);
		}
		if (IsJsonString(adj_record[i-1])) {
			adj_record[i-1] = JSON.parse(adj_record[i-1]);
		}
		if (IsJsonString(noun_record[i-1])) {
			noun_record[i-1] = JSON.parse(noun_record[i-1]);
		}
		
		// if (IsJsonString(verb_record[i-1])) {
			// console.log(verb_record[i-1].word);
		// }
	}

	console.log("verb_record: " + verb_record);
	console.log("adj_record: " + adj_record);
	console.log("noun_record: " + noun_record);
	
	record = [noun_record,adj_record,verb_record];

	set_data();
}

function select(arg){

	console.log(arg.data);
	// console.log(m_history.is_level_active_obs.value[1]);
	switch (arg.data){
		case "N1": m_history.is_level_active_obs.value[0] = !m_history.is_level_active_obs.value[0];
		break;
		case "N2": m_history.is_level_active_obs.value[1] = !m_history.is_level_active_obs.value[1];
		break;
		case "N3": m_history.is_level_active_obs.value[2] = !m_history.is_level_active_obs.value[2];
		break;
		case "N4": m_history.is_level_active_obs.value[3] = !m_history.is_level_active_obs.value[3];
		break;
		case "N5": m_history.is_level_active_obs.value[4] = !m_history.is_level_active_obs.value[4];
		break;
		case "名": m_history.is_mode_active_obs.value[0] = !m_history.is_mode_active_obs.value[0];
		break;
		case "形": m_history.is_mode_active_obs.value[1] = !m_history.is_mode_active_obs.value[1];
		break;
		case "動": m_history.is_mode_active_obs.value[2] = !m_history.is_mode_active_obs.value[2];
		break;
	}

	console.log(JSON.stringify(m_history.is_level_active_obs.value));
	console.log(JSON.stringify(m_history.is_mode_active_obs.value));

	set_data();
}

function set_data(){

	console.log("[function] set_data");

	m_history.data_obs.clear();

	for(let j = 0; j < 3; j++){

		if(m_history.is_mode_active_obs.value[j] == true){

			for(let i = 0; i < 5; i++){

				if (m_history.is_level_active_obs.value[i] == true && record[j][i]){
					
					// console.log("push data: " + record[j][i]);
					// m_history.data_obs[m_history.data_obs.length] = record[j][i];
					// m_history.data_obs.value = m_history.data_obs.value.concat(record[j][i]);
					// if (typeof m_history.data_obs.value === 'object'){ // object

						// console.log("data_obs type: " + typeof m_history.data_obs.value);
						// if()
						// console.log("-- ADD ")
						// console.log("record: " + record[j][i]);
						// console.log("record: " + JSON.stringify(record[j][i]));
						// console.log("length: " + record[j][i].length);

						if(!m_history.data_obs.value){ // if nothing
							m_history.data_obs.replaceAll(record[j][i]);
							continue;
						}

						// if something already
						if(record[j][i].length > 1 ){
							console.log("-- add all --");
							m_history.data_obs.addAll(record[j][i]);
							// m_history.data_obs.value.concat()
						} else {
							console.log("-- add one --");
							m_history.data_obs.add(record[j][i]);
						}

					// } else { // array

					// }
				}
			}
		}
	}
	console.log("data_obs: " + m_history.data_obs.value);
	console.log("data_obs: " + JSON.stringify(m_history.data_obs.value));
}

module.exports = {
	read_record,
	select,
	delete_record
}