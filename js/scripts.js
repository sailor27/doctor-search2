var apiKey = require('./../.env').apiKey;
// var searchLimit = 40;
export class Query {
	constructor(condition, doctor) {
		this.condition = condition;
		this.doctor = doctor;
	}
		getQuery(success, error){
	  $.ajax({
	    url:`https://api.betterdoctor.com/2016-03-01/doctors?last_name=${this.doctor}&query=${this.condition}&location=or-portland&user_location=45.5231,-122.6765&skip=0&limit=50&user_key=${apiKey}`,
	    type: 'GET',
	    data: {
	      format: 'json'
	    },
	    success: function(response) {
				console.log("API CONNECTED. You did it!");
				let results = [];


//push data returned from API into  array
				console.log("response length : " + response.data.length);
				for (var i = 0; i < response.data.length; i++){
					let address = response.data[i].practices[0].visit_address;

					results.push(response.data[i].profile.first_name + " " + response.data[i].profile.last_name + '<br>' + address.street + '<br>' + address.city + ', ' + address.state_long);
				}
				console.log("results array: " + results);
				success(results);
	    },
	    error: function(response) {
	      error(response);
	    }
	  });//API CALL
	}//query method
} //constructor
