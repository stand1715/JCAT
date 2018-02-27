let m_question = require ('question/models/MQuestion'); 
let c_question = require ('question/controllers/CQuestion');
let Storage = require("FuseJS/Storage");

// let kana_to_romaji = {"あ":"a","い":"i","う":"u","え":"e","お":"o","ゔぁ":"va","ゔぃ":"vi","ゔ":"vu","ゔぇ":"ve","ゔぉ":"vo","か":"ka","き":"ki","きゃ":"kya","きぃ":"kyi","きゅ":"kyu","く":"ku","け":"ke","こ":"ko","が":"ga","ぎ":"gi","ぐ":"gu","げ":"ge","ご":"go","ぎゃ":"gya","ぎぃ":"gyi","ぎゅ":"gyu","ぎぇ":"gye","ぎょ":"gyo","さ":"sa","す":"su","せ":"se","そ":"so","ざ":"za","ず":"zu","ぜ":"ze","ぞ":"zo","し":"shi","しゃ":"sha","しゅ":"shu","しょ":"sho","じ":"ji","じゃ":"ja","じゅ":"ju","じょ":"jo","た":"ta","ち":"chi","ちゃ":"cha","ちゅ":"chu","ちょ":"cho","つ":"tsu","て":"te","と":"to","だ":"da","ぢ":"di","づ":"du","で":"de","ど":"do","な":"na","に":"ni","にゃ":"nya","にゅ":"nyu","にょ":"nyo","ぬ":"nu","ね":"ne","の":"no","は":"ha","ひ":"hi","ふ":"fu","へ":"he","ほ":"ho","ひゃ":"hya","ひゅ":"hyu","ひょ":"hyo","ふぁ":"fa","ふぃ":"fi","ふぇ":"fe","ふぉ":"fo","ば":"ba","び":"bi","ぶ":"bu","べ":"be","ぼ":"bo","びゃ":"bya","びゅ":"byu","びょ":"byo","ぱ":"pa","ぴ":"pi","ぷ":"pu","ぺ":"pe","ぽ":"po","ぴゃ":"pya","ぴゅ":"pyu","ぴょ":"pyo","ま":"ma","み":"mi","む":"mu","め":"me","も":"mo","みゃ":"mya","みゅ":"myu","みょ":"myo","や":"ya","ゆ":"yu","よ":"yo","ら":"ra","り":"ri","る":"ru","れ":"re","ろ":"ro","りゃ":"rya","りゅ":"ryu","りょ":"ryo","わ":"wa","を":"wo","ん":"n","ゐ":"wi","ゑ":"we","きぇ":"kye","きょ":"kyo","じぃ":"jyi","じぇ":"jye","ちぃ":"cyi","ちぇ":"che","ひぃ":"hyi","ひぇ":"hye","びぃ":"byi","びぇ":"bye","ぴぃ":"pyi","ぴぇ":"pye","みぇ":"mye","みぃ":"myi","りぃ":"ryi","りぇ":"rye","にぃ":"nyi","にぇ":"nye","しぃ":"syi","しぇ":"she","いぇ":"ye","うぁ":"wha","うぉ":"who","うぃ":"wi","うぇ":"we","ゔゃ":"vya","ゔゅ":"vyu","ゔょ":"vyo","すぁ":"swa","すぃ":"swi","すぅ":"swu","すぇ":"swe","すぉ":"swo","くゃ":"qya","くゅ":"qyu","くょ":"qyo","くぁ":"qwa","くぃ":"qwi","くぅ":"qwu","くぇ":"qwe","くぉ":"qwo","ぐぁ":"gwa","ぐぃ":"gwi","ぐぅ":"gwu","ぐぇ":"gwe","ぐぉ":"gwo","つぁ":"tsa","つぃ":"tsi","つぇ":"tse","つぉ":"tso","てゃ":"tha","てぃ":"thi","てゅ":"thu","てぇ":"the","てょ":"tho","とぁ":"twa","とぃ":"twi","とぅ":"twu","とぇ":"twe","とぉ":"two","ぢゃ":"dya","ぢぃ":"dyi","ぢゅ":"dyu","ぢぇ":"dye","ぢょ":"dyo","でゃ":"dha","でぃ":"dhi","でゅ":"dhu","でぇ":"dhe","でょ":"dho","どぁ":"dwa","どぃ":"dwi","どぅ":"dwu","どぇ":"dwe","どぉ":"dwo","ふぅ":"fwu","ふゃ":"fya","ふゅ":"fyu","ふょ":"fyo","ぁ":"a","ぃ":"i","ぇ":"e","ぅ":"u","ぉ":"o","ゃ":"ya","ゅ":"yu","ょ":"yo","っ":"","ゕ":"ka","ゖ":"ka","ゎ":"wa","んあ":"n'a","んい":"n'i","んう":"n'u","んえ":"n'e","んお":"n'o","んや":"n'ya","んゆ":"n'yu","んよ":"n'yo"};

// Add word to notes
function h_add_clicked(){

	console.log("--- add notes: " + m_question.current_choice_obs);

			// create file name 
			let t_file_name = m_question.current_level_obs.value + m_question.current_mode_obs.value + ".txt";

			console.log("t_file_name: " + t_file_name);

			// read storage
			let t_storage = Storage.readSync(t_file_name);

			// console.log("t_storage: " + t_storage);

			if (t_storage == '') { // check emptyness

				console.log("-- the file is empty --")

				t_storage = '[]';
			}

			// json stringify
			let t_word_data = JSON.stringify(m_question.current_item_obs.value);

			// console.log("t_word_data: " + t_word_data);

			// check if contain already

			if (t_storage.indexOf(t_word_data) < 0) { // not contain

				t_storage = JSON.parse(t_storage);

				// if (typeof t_storage === 'object'){ // if object


					// t_storage = [t_storage];
				// console.log("storage size: " + Object.size(t_storage));
				t_storage.push(m_question.current_item_obs.value);

				// } else { // array

					// t_storage.add(m_question.current_item_obs.value);

				// }

				t_storage = JSON.stringify(t_storage);

				console.log("combined storage: " + t_storage);
				
				// store
				let success = Storage.writeSync( t_file_name, t_storage );

				if(success) {
					console.log("Successfully wrote " + m_question.current_item_obs.value.word + " to "  + t_file_name);
				}
				else {
					console.log("An error occured!");
				}

			}
		}

// function toRomaji(kana){

// 	let t_romaji = [];

// 	for (let i = 0; i < kana.length; i++) {
// 	 	t_romaji.push(kana_to_romaji[kana.charAt(i)]);
// 	}

// 	console.log(t_romaji);
// 	return t_romaji;
// }

module.exports =
{		
	h_add_clicked
}

