const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'

$(document).ready( () => {
  getMeals()
  mealFoodDeleteListener()
  addFoodToMeal()
})

const getMeals = () => {
  $.get(`${api}/meals`, (data) => {
    $.each(data, (key, value) => {
      appendMeal(value)
    })
  }).then(() => {
    $('tr.all-total').remove()
    allTotalCal()
  })
    .then(() => {
      $('tr.all-rem').remove()
      allRemCal()
    })
}

const appendMeal = (meal) => {
  $('div.meal-wrapper').append(`<div class='box${meal.id}'><table id=${meal.id} class='meal-foods'>
  <caption class='meal-name'><h1 class='meal'>${meal.name}</h1></caption>
  <tr><th>Ingredients</th><th>Calories</th></tr>
  </table></div>`)
    .append(mealFoods(meal))
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
  appendCalTotals(meal)
  appendRemCal(meal)
}

const getSum = (total, sum) => (total + sum)

const allRemCal = () => {
  let total = $('td.green, td.red').get()
  let sum = 0
  $.each(total, (i, mealCal) => {
    sum += parseInt(mealCal.innerHTML)
  })
  if(sum >= 0){
    $('table.totals-table').append(`<tr class='all-rem'><td>All Remaining Calories: </td>
    <td class='green'>${sum}</td></tr>`)
  }else if(sum < 0){
    $('table.totals-table').append(`<tr class='all-rem'><td>All Remaining Calories: </td>
    <td class='red'>${sum}</td></tr>`)
  }
}

const allTotalCal = () => {
  let total = $('td.meal-calories').get()
  let sum = 0
  $.each(total, (i, mealCal) => {
    sum += parseInt(mealCal.innerHTML)
  })
  $('table.totals-table').append(`<tr class='all-total'><td>Total Calories: </td><td>${sum}</td></tr>`)
}

const addFoodToMeal = () => {
  $('.btn-group').on('click', 'button[id^=meal-button]', (e) => {
    e.preventDefault()
    let mealId = e.target.id.slice(-1)
    let ids = $('input:checked')
    $.each(ids, (i, check) => {
      let id = check.id.replace('food-', '')
      $.ajax({
        type: 'POST',
        url: `${api}/meals/${mealId}/foods/${id}`
      })
    })
    $.get(`${api}/meals/${mealId}/foods`, data => {
      $('input[type=checkbox]').prop('checked',false);
      $(`table#${mealId} tr:not(:first-child)`).remove()
      mealFoods(data)
    })
  })
}

const prependMealFood = (food) => {
  $(`<tr id=${food.id}>
<td><input id='food-${food.id}' type="checkbox"></td>
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
  if(calories >= 0){return `<tr class='rem-cal'><td class='remaining-cal'>Remaining Calories: </td><td class='green'> ${calories} </td></tr>`}
  if(calories < 0){return `<tr class='rem-cal'><td class='remaining-cal'>Remaining Calories: </td><td class='red'> ${calories} </td></tr>`}
}


const appendCalTotals = (meal) => {
  $(`table#${meal.id} tr:last`).after(`<tr class='meal-cal-total'><td class='total'>Total Calories: </td>
  <td class='meal-calories'>${mealCalorieTotal(meal)}</td>
  </tr>`)
}

const appendRemCal = (meal) => {
  $(`table#${meal.id} tr:last`).after(remCal(meal))
}

module.exports = {getMeals, prependMealFood, addFoodToMeal}
