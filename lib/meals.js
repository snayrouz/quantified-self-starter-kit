const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'

const appendMeal = (meal) => {
  $('.meals').append(`<table id=${meal.id} class='meal-foods-table'>
                      <caption class='meal-name'>${meal.name}</caption>
                      <tr><th>Ingredients</th><th>Calories</th><th></th></tr>
                      </table>`)
    .append(mealFoods(meal))
    appendCalTotals(meal)
    appendRemCal(meal)
}

const mealFoods = (meal) => {
  let foods = meal.foods
  foods.forEach((food) => {
    $(`table#${meal.id}`).append(`<tr class='${food.id} meal${food.id += 1}'>
               <td class='food-name'>${food.name}</td>
               <td class='food-calories'>${food.calories}</td>
               <td><a class='meal-food-delete'><i class="fa fa-minus-circle" aria-hidden="true"></i></a></td>
      </tr>`)
  })


  $('.meals').on('click', 'a.meal-food-delete', (e) => {
    e.preventDefault()
    let id = $(e.currentTarget).parent().parent().attr('class').split(' ')[0]
    let classNum = $(e.currentTarget).parent().parent().attr('class').split(' ')[1]
    let mealId = $(e.currentTarget).parent().parent().parent().parent()[0].id
    deleteFoodFromMeals(mealId, id, classNum, meal)
  })
}


const getMeals = () => {
  $.get(`${api}/meals`, (data) => {
    $.each(data, (key, value) => {
      appendMeal(value)
    })
  })
}

const deleteFoodFromMeals = (mealId, id) => {
  $.ajax({
    type: 'DELETE',
    url: `${api}/meals/${mealId}/foods/${id}`,
    success: $('div.meals').html('')
  }).then(getMeals())
}

const mealCalorieTotal = (meal) => {
  let sum = 0
  $.each(meal['foods'], (i, food) =>{
    sum += food.calories
  })
  return sum
}

const remCal = (meal) => {
  let calories = 0
  if(meal.name === 'Snack') {calories = 200 - mealCalorieTotal(meal)}
  if(meal.name === 'Breakfast') {calories = 400 - mealCalorieTotal(meal)}
  if(meal.name === 'Lunch') {calories = 600 - mealCalorieTotal(meal)}
  if(meal.name === 'Dinner') {calories = 800 - mealCalorieTotal(meal)}
  if(calories >= 0){return `<tr><td class='remaining-cal'>Remaining Calories: </td><td class='green'> ${calories} </td></tr>`}
  if(calories < 0){return `<tr><td class='remaining-cal'>Remaining Calories: </td><td class='red'> ${calories} </td></tr>`}
}


const appendCalTotals = (meal) => {
  $('.meals tr:last').after(`<tr><td class='total'>Total Calories: </td><td class='meal-calories'>${mealCalorieTotal(meal)}</tr>`)
}

const appendRemCal = (meal) => {
  $('.meals tr:last').after(remCal(meal))
}

module.exports = getMeals();
