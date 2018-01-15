import { Query } from './../js/scripts.js';

$(document).ready(function() {
  $('#search').submit(function() {
    event.preventDefault();

		const condition = $('#condition-search').val();
		const doctor = $('#name-search').val();

		const newQuery = new Query(condition, doctor);
		console.log(newQuery);


		newQuery.getQuery(function(results) {
			$('#output').empty();
			$('#output1').empty();
			$('#output2').empty();

			if (results.length < 1){
				$("#output").append("Your search for " + "\"" + condition + "\"" + " " + "\"" + doctor + "\"" + " returned 0 results. Please try a different search term.");
			} else {
				$("#output").append("Your search for " + "\"" + condition+ "\"" + " " + "\"" + doctor + "\"" + "returned  " + results.length + " results");
			}

			for (var i = 0; i < results.length; i++){
				$("#output2").append(`<ul><li> ${results[i]} </li></ul>`);
			}

		},

		function(error) {
			$('#output1').text(`NO API CONNECTION. There was an error processing your search. Please try again.`);
		});

	});
}); // end of document.ready
