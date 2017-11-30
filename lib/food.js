const $ = require('jquery')
const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'


$('form').submit(function(e) {
  e.preventDefault() //  tells the user agent if
  // the event doesnt get explicitly handled,
  // its default action should not be taken as it normally would be.
  let food = $('input[name="food"]').val()
  let calories = $('input[name="calories"]').val()
  $('.new-food-form').each(function() { this.reset() })
  $('p.food-error').remove()
  requests.createFood(food, calories)
})
