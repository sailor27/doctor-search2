import { Query } from './../js/scripts.js';

$(document).ready(function() {
  $('#search').submit(function() {
    event.preventDefault();

		const condition = $('#condition-search').val();
		const doctor = $('#name-search').val();

		const newQuery = new Query(condition, doctor);
		console.log(newQuery);


		newQuery.getQuery(function(results) {
			console.log(results);
			for (var i = 0; i < results.length; i++){
				$("#output").append(`<li> ${results[i]} </li>`);
			}

		},

		function(error) {
			$('#output1').text(`NO API CONNECTION. There was an error processing your search. Please try again.`);
		});

	});
}); // end of document.ready
