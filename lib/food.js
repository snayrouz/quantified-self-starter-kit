const $ = require('jquery')
const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'


$('form').submit(function (e) {
 	  e.preventDefault();
 	  var food = $('input[name="food"]').val();
 	  var calories = $('input[name="calories"]').val();
 	  $.ajax({
 	    type: "POST",
 	    url: 'https://warm-sierra-65111.herokuapp.com/api/v1',
 	    data: { food: {
 	        name: $.trim(food),
 	        calories: $.trim(calories)
 	      } },
 	    success: function (data) {
 	      $('.foods-table').append('<tr><td>' + data.name + '</td>' + '<td>' + data.calories + '</td>' + `<td><input id=${data.id}'/></td>` + "</tr>");
 	    }
 	  });

    // need to refactor
