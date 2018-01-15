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

					if (response.data[i].practices[0].accepts_new_patients){
						var patients = "Accepting New Patients";
						console.log(patients);
					} else {
						var patients = "Not Accepting New Patients";
					}

					if (response.data[i].practices[0].website){
						var website = response.data[i].practices[0].website;
					} else {
						var website = "No Website Available";
					}

					results.push('<strong>' + response.data[i].profile.first_name  + " " + response.data[i].profile.last_name + '</strong>' + '<br>' + address.street + '<br>' + address.city + ', ' + address.state_long + '<br>' + "Phone: " + response.data[i].practices[0].phones[0].number + '<br>' + website + '<br>' + patients);


				} //end for loop
				console.log("results array: " + results);
				success(results);
	    },
	    error: function(response) {
	      error(response);
	    }
	  });//API CALL
	}//query method
} //constructor
