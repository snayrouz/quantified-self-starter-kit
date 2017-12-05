const $ = require('jquery')
const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'
const handlers = require('./handlers')
const foods = require('./foods')

const createFood = (food, calories) => {
  $.ajax({
    type: "POST",
    url: `${api}/foods`,
    data: { food: {
      name: $.trim(food),
      calories: $.trim(calories)
    }},
    success: (data) => {
      handlers.postSuccess(data)
    },
    error: (error) => {
      handlers.postError(error)
    }
  })
}

const retrieveFoods = () => {
  $.get(`${api}/foods`)
    .then((foods) => {
      foods = foods.sort((a, b) => {
        return a.id - b.id
      })
      foods.forEach((food) => {
        handlers.prependFood(food)
      })
    })
  foods.deleteFoodId
}


module.exports = {createFood, retrieveFoods}
