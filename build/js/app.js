(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "5b888eeaf84ae50166ab683362de6b01";

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var apiKey = require('./../.env').apiKey;

var Query = exports.Query = function () {
	function Query(condition, doctor) {
		_classCallCheck(this, Query);

		this.condition = condition;
		this.doctor = doctor;
	}

	_createClass(Query, [{
		key: 'getQuery',
		value: function getQuery(_success, _error) {
			$.ajax({
				url: 'https://api.betterdoctor.com/2016-03-01/doctors?last_name=' + this.doctor + '&query=' + this.condition + '&location=or-portland&user_location=45.5231,-122.6765&skip=0&limit=50&user_key=' + apiKey,
				type: 'GET',
				data: {
					format: 'json'
				},
				success: function success(response) {
					console.log("API CONNECTED. You did it!");
					var results = [];

					//push data returned from API into  array
					for (var i = 0; i < response.data.length; i++) {
						var address = response.data[i].practices[0].visit_address;

						if (response.data[i].practices[0].accepts_new_patients) {
							var patients = "Accepting New Patients";
						} else {
							var patients = "Not Accepting New Patients";
						}

						if (response.data[i].practices[0].website) {
							var website = "<a href = \"response.data[i].practices[0].website\">Website</a>";
						} else {
							var website = "No Website Available";
						}

						results.push('<strong>' + response.data[i].profile.first_name + " " + response.data[i].profile.last_name + '</strong>' + '<br>' + address.street + '<br>' + address.city + ', ' + address.state_long + '<br>' + "Phone: " + response.data[i].practices[0].phones[0].number + '<br>' + website + '<br>' + patients);
					} //end for loop

					_success(results);
				},
				error: function error(response) {
					_error(response);
				}
			}); //API CALL
		} //query method

	}]);

	return Query;
}(); //constructor

},{"./../.env":1}],3:[function(require,module,exports){
'use strict';

var _scripts = require('./../js/scripts.js');

$(document).ready(function () {
	$('#search').submit(function () {
		event.preventDefault();

		var condition = $('#condition-search').val();
		var doctor = $('#name-search').val();

		var newQuery = new _scripts.Query(condition, doctor);
		console.log(newQuery);

		newQuery.getQuery(function (results) {
			$('#output').empty();

			if (results.length < 1) {
				$("#output").append("Your search for " + condition + " " + doctor + " returned 0 results. Please try a different search term.");
			} else {
				$("#output").append("Your search for " + condition + " " + doctor + "returned  " + results.length + " results");
			}

			for (var i = 0; i < results.length; i++) {
				$("#output").append('<li> ' + results[i] + ' </li>');
			}
		}, function (error) {
			$('#output1').text('NO API CONNECTION. There was an error processing your search. Please try again.');
		});
	});
}); // end of document.ready

},{"./../js/scripts.js":2}]},{},[3]);
