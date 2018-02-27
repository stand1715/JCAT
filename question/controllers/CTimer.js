let m_question = require ('question/models/MQuestion'); 

let Timer = require("FuseJS/Timer");

let Timer01;
let Timer_total;
let Timer_add;
let Timer_minus;

// function c_time_up(){
// 	Timer.delete(Timer_total);
// }

function c_set_Timer01(){

	Timer01 = Timer.create(function() {
		m_question.timer.value = m_question.timer.value + 0.01;
		if (m_question.timer.value >= m_question.time_count){
			Timer.delete(Timer01);
			Timer.delete(Timer_total);
			m_question.timer.value = m_question.time_count;
		}
	}, 10, true);
}

function c_start_timer(){
	if(Timer01 != null){
		Timer.delete(Timer01);
	}
	m_question.timer.value = 0;
	m_question.timer_total.value = 0;

	Timer_total = Timer.create(function() {
		m_question.timer_total.value = m_question.timer_total.value + 0.1;
	}, 100, true);

	c_set_Timer01();
}

function c_continue_timer(){
	Timer_total = Timer.create(function() {
		m_question.timer_total.value = m_question.timer_total.value + 0.1;
	}, 100, true);
	c_set_Timer01();
}

function c_pause_timer(){
	if(Timer_total != null){
		Timer.delete(Timer_total);
	}
	if(Timer01 != null){
		Timer.delete(Timer01);
	}
	if(Timer_add != null){
		Timer.delete(Timer_add);
	}
	if(Timer_minus != null){
		Timer.delete(Timer_minus);
	}
}

function c_add_timer(){
	if ((m_question.timer.value - 1.2) < 0) {
		m_question.timer_freeze.value = 0;
	} else {
		m_question.timer_freeze.value = m_question.timer.value - 1.2;
	}

	// Gradually add
	if(Timer01 != null){
		Timer.delete(Timer01);
	}
	Timer_add = Timer.create(function() {
		m_question.timer.value = m_question.timer.value - 0.048;

		if (m_question.timer.value <= 0){
			m_question.timer.value = 0;
			m_question.timer_freeze.value = 0;
			Timer.delete(Timer_add);
		}
		if (m_question.timer_freeze.value >= m_question.timer.value - 0.048) 
		{ 
	    	// m_question.timer.value = m_question.timer_freeze.value ;
	    	Timer.delete(Timer_add);
	    }

	}, 10, true);

	Timer.create(function() {
		c_set_Timer01();
	}, 600, false);
	// m_question.timer.value = m_question.timer.value - 1;
}

function c_minus_timer(){
	if ((m_question.timer.value + 2) > m_question.time_count) {
		m_question.timer_freeze.value = m_question.time_count;
	} else {
		m_question.timer_freeze.value = m_question.timer.value + 2;
	}

	// Gradually minus
	if(Timer01 != null){
		Timer.delete(Timer01);
	}
	Timer_minus = Timer.create(function() {
		m_question.timer.value = m_question.timer.value + 0.08;

		if (m_question.timer.value >= m_question.time_count){
			m_question.timer.value = m_question.time_count;
			m_question.timer_freeze.value = m_question.time_count;
			Timer.delete(Timer_minus);
		}
		if (m_question.timer_freeze.value <= m_question.timer.value + 0.08){
			m_question.timer.value = m_question.timer_freeze.value - 0.04;
			Timer.delete(Timer_minus);
		}
	}, 10, true);

	Timer.create(function() {
		c_set_Timer01();
	}, 600, false);

	// m_question.timer.value = m_question.timer.value + 2;

}

module.exports = {
	c_start_timer,
	c_pause_timer,
	c_add_timer,
	c_minus_timer,
	c_continue_timer
}