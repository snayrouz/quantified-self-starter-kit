const handlers = require('./handlers')
const requests = require('./request')
const api = 'https://qs-js-api.herokuapp.com/api/v1'

$(document).ready(() => {
  requests.retrieveFoods()
  $('#myInput').keyup(filterFoods)

  $('.foods-table').on('focusout', '[contenteditable]', function() {
    let id = $(this).closest('tr').attr('id')
    let attribute = $(this).attr('class').replace('food-', '')
    let value = $(this).text()
    updateFood(id, attribute, value)
  })
})

const updateFood = (id, attr, value) => {
  let updatedFood = { food: {}}
  updatedFood['food'][attr] = value
  $.ajax({
    type: 'PATCH',
    url: `${api}/foods/${id}`,
    data: updatedFood,
    success: console.log(`${attr} updated to ${value}`)
  })
}

const filterFoods = () => {
  let input = $('#myInput')
  let filter = input.val().toUpperCase()
  let table = $('.foods-table')
  $('.food-name').each(function() {
    if($(this).text().toUpperCase().includes(filter)){
      $(this).parent().show()
    } else {
      $(this).parent().hide()
    }
  })
}

$('form').submit((e) => {
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
      datum.foods.filter((food) => {
        if(id==food.id){
          deleteFoodFromMeals(datum, id)
          deleteFood(id)
        }else {
          deleteFood(id)
        }
      })
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

module.exports = {deleteFoodId}
