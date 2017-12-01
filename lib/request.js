const $ = require('jquery')
const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'
const handlers = require('./handlers')

const createFood = (food, calories) => {
  $.ajax({
    type: "POST",
    url: `${api}/foods`,
    data: { food: {
      name: $.trim(food),
      calories: $.trim(calories)
    }},
    success: function(data) {
      handlers.postSuccess(data)
    },
    error: function(error) {
      handlers.postError(error)
    }
  })
}

module.exports = {createFood}
