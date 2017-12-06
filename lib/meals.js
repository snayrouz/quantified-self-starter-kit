const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'

const getMeals = () => {
  $.get(`${api}/meals`, (data) => {
    console.log(data)
    $.each(data, (key, value) => {
      appendMeal(value)
    })
  })//.then(mealFoodDeleteListener())
}

const appendMeal = (meal) => {
  $('div.meal-wrapper').append(`<div class='box'><table id=${meal.id} class='meal-foods'>
                             <caption class='meal-name'><h1 class='meal'>${meal.name}</h1></caption>
                             <tr><th>Ingredients</th><th>Calories</th></tr>
                             </table></div>`)
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
                                  <td class='delete'><a class='meal-food-delete'><i class="fa fa-minus-circle" aria-hidden="true"></i></a></td>
                                  </tr>`)
  })
}

const prependMealFood = (food) => {
  $(`<tr id=${food.id}>
      <td></td>
      <td class='food-name' contenteditable='true'>${food.name}</td>
      <td class='food-calories' contenteditable='true'>${food.calories}</td>
      </tr>`).prependTo('tbody.meal-foods-body')
}

const mealFoodDeleteListener = () => {
  $('.meal-wrapper').on('click', 'a.meal-food-delete', (e) => {
    e.preventDefault()
    let id = $(e.currentTarget).closest('tr').attr('class').split(' ')[0]
    let mealId = $(e.currentTarget).closest('table')[0].id
    deleteFoodFromMeals(mealId, id)
  })
}


const deleteFoodFromMeals = (mealId, id) => {
  $.ajax({
    type: 'DELETE',
    url: `${api}/meals/${mealId}/foods/${id}`,
    success: `Meal Food ${id} deleted`
  }).then(() => {
    $('.meal-wrapper').empty()
      getMeals()
    })
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
  $(`table#${meal.id} tr:last`).after(`<tr><td class='total'>Total Calories: </td>
                                       <td class='meal-calories'>${mealCalorieTotal(meal)}</td>
                                       </tr>`)
}

const appendRemCal = (meal) => {
  $(`table#${meal.id} tr:last`).after(remCal(meal))
}

getMeals()
mealFoodDeleteListener()
module.exports = {getMeals, prependMealFood}
