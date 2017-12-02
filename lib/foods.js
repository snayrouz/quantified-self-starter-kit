const handlers = require('./handlers')
const requests = require('./request')
const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'

$(document).ready(function() {

}

$('form').submit(function(e) {
  e.preventDefault()
  let food = $('input[name="food"]').val()
  let calories = $('input[name="calories"]').val()
  $('.new-food-form').each(function() { this.reset() })
  $('p.food-error').remove()
  requests.createFood(food, calories)
})

const deleteFoodId = $('.foods-table').on('click', 'a.delete', (e) => {
  let id = $(e.target).parent().parent().parent()[0].id
  $.get(`${api}/meals`, data => {
    data.forEach((datum) => {
      if(datum.foods.includes(id)){
        datum.foods.filter((food) => {
          if(id==food.id){
            deleteFoodFromMeals(datum, id)
            deleteFood(id)
          }
        })
      }else {
        deleteFood(id)
      }
    })
  })
  e.preventDefault()
})

const deleteFood = (id) => {
  $.ajax({
    type: 'DELETE',
    url: `${api}/foods/${id}`
  }).then($(`tr#${id}`).remove())
}

const deleteFoodFromMeals = (meal, id) => {
  $.ajax({
    type: 'DELETE',
    url: `${api}/meals/${meal.id}/foods/${id}`
  })
}

const getFoods = () => {
  $.get(`${api}/foods`, (data) => {
    $.each(data, (key, value) => {
      handlers.appendFood(value)
    })
  })
  deleteFoodId
}

module.exports = getFoods();
