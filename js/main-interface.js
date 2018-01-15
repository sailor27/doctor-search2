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

		},

		function(error) {
			$('#output1').text(`NO API CONNECTION. There was an error processing your search. Please try again.`);
		});

	});
}); // end of document.ready
