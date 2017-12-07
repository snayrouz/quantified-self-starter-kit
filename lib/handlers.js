const mealFoods = require('./meals')
const $ = require('jquery')

const postSuccess = (data) => {
  prependFood(data)
}

const postError = (error) => {
  if(error.responseText.includes('name') && error.responseText.includes('calories')){
    $('input.food').after('<p class="food-error">Please enter a food name</p>')
    $('input.calories').after('<p class="food-error">Please enter a calorie amount</p>')
  } else if(error.responseText.includes('name')) {
    $('input.food').after('<p class="food-error">Please enter a food name</p>')
  } else {
    $('input.calories').after('<p class="food-error">Please enter a calorie amount</p>')
  }
}

const prependFood = (food) => {
  $(`<tr id=${food.id}>
      <td class='food-name' contenteditable='true'>${food.name}</td>
      <td class='food-calories' contenteditable='true'>${food.calories}</td>
      <td class='delete'><a class='delete' ><i class="fa fa-minus-circle" aria-hidden="true"></i></a></td>
      </tr>`).prependTo('tbody.foods-body')
  mealFoods.prependMealFood(food)
}

module.exports = {postSuccess, postError, prependFood}
