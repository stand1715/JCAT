let Bundle = require("FuseJS/Bundle");
let Observable = require('FuseJS/Observable')
let Storage = require ("FuseJS/Storage");

let m_question = require ('question/models/MQuestion'); 

let Timer = require("FuseJS/Timer");

// TODO for refresh testing only
// c_retrieve_data();

function c_retrieve_data(is_question){

		m_question.record_obs.clear();

		console.log(" -------------- c_retrieve_data ------------- ")
		console.log(" -------------- c_retrieve_data ------------- ")
		console.log(" -------------- c_retrieve_data ------------- ")
		let t_path;

		switch(m_question.current_mode_obs.value){
			case '動': t_path = 'app/data/' + m_question.current_level_obs.value.toLowerCase() + '_verb.json'; break;
			case '形': t_path = 'app/data/' + m_question.current_level_obs.value.toLowerCase() + '_adj.json'; break;
			case '名': t_path = 'app/data/' + m_question.current_level_obs.value.toLowerCase() + '_noun.json'; break;
			default: t_path = 'app/data/n5_verb.json';
		}

		// Load json data 
		Bundle.read(t_path).then((responseObject) => {

			// for Bundle experiment
			if (!responseObject) {
				console.log("[ DEBUG / Bundle Fails ] " + t_path);
				return;
			}

			console.log("[ SUCCESS LOADING & PARSE ] " + t_path);

			let temp = JSON.parse(responseObject);

			m_question.data_obs = shuffleArray(temp);
		})

		// set current item
		if(is_question){
			// question mode - set choices
			Timer.create(function() {
				m_question.choice_data_obs.clear();
				// m_question.current_choice_obs.clear();

				console.log("Question Length: " + m_question.data_obs.length);
				for(let i = 0; i < m_question.data_obs.length; i++){
				// for(let i = 0; i < 10; i++){
					c_choices_setting(i);
				}

				Timer.create(function() {
					// record init
					// m_question.record_obs.add(m_question.data_obs[m_question.current_num_obs.value]);
					m_question.current_item_obs.value = m_question.data_obs[m_question.current_num_obs.value];
					m_question.current_choice_obs.replaceAll(m_question.choice_data_obs.getAt(m_question.current_num_obs.value));
				}, 200, false);
			}, 200, false);

		} else {
			// memorizing mode
			Timer.create(function() {
				
				m_question.current_item_obs.value = m_question.data_obs[m_question.current_num_obs.value];

				// set length of data (number of question)
				m_question.data_length_obs.value = m_question.data_obs.length;

			}, 200, false);
		}
}

function c_choices_setting(i){

	// console.log(m_question.current_item_obs.value.choice);
	// console.log(m_question.data_obs[i].word);

    let t_data_choices = m_question.data_obs[i].choice.split(',');
    let t_random_num = Math.floor(Math.random() * (t_data_choices.length - 3));
   	let t_game_choices = t_data_choices.slice( t_random_num, t_random_num + 3);

 	let arr = [];
	for (let i = 0; i < 3; i++) {
	    arr.push({
	        answer: t_game_choices[i],
	        is_correct: false
	    });
	}
	
	arr.push({
		answer: m_question.data_obs[i].hiragana,
	    is_correct: true
	});

	m_question.choice_data_obs.add(shuffleArray(arr));
	// console.log (m_question.choice_data_obs.getAt(i)[0].answer);
	// console.log (m_question.choice_data_obs.getAt(i)[1].answer);
	// console.log (m_question.choice_data_obs.getAt(i)[2].answer);
	// console.log (m_question.choice_data_obs.getAt(i)[3].answer);
}

function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;

}

function c_correct(){
	m_question.data_obs[m_question.current_num_obs.value]["correctness"] = true;
}
function c_wrong(){
	m_question.data_obs[m_question.current_num_obs.value]["correctness"] = false;
}

function c_next_question(){
	Timer.create(function() {

		m_question.data_obs[m_question.current_num_obs.value].is_record = Observable();
		// recording

		m_question.record_obs.add(m_question.data_obs[m_question.current_num_obs.value]);

		m_question.current_num_obs.value++;

		console.log("[c_next_question] m_question.current_item_obs.value: " + m_question.current_item_obs.value.hiragana);

		m_question.current_item_obs.value = m_question.data_obs[m_question.current_num_obs.value];
		m_question.current_choice_obs.replaceAll(m_question.choice_data_obs.getAt(m_question.current_num_obs.value));
		m_question.is_clickable.value = true;

	}, 600, false);
}

function c_next_word(){

	Timer.create(function() {

		m_question.current_num_obs.value++;

		console.log("[c_next_question] m_question.current_item_obs.value: " + m_question.current_item_obs.value.hiragana);

		m_question.current_item_obs.value = m_question.data_obs[m_question.current_num_obs.value];
	
	}, 300, false);
}

// class word {
//   constructor(word, hiragana, meaning, correctness) {
//     this.word = word;
//     this.hiragana = hiragana;
//     this.meaning = meaning;
//     this.correctness = correctness;
//   }

//   get string(){
//   	return "{word:\"" + this.word + "\",hiragana:\"" + this.hiragana + "\",meaning:\"" + this.meaning + "\",correctness:\"" + this.correctness + "\"}";
//   }
// }

module.exports = {
	c_retrieve_data,
	c_next_question,
	c_correct,
	c_wrong,
	c_next_word
	}
