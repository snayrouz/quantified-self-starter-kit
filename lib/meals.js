const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'

const appendMeal = (meal) => {
  $('.meals').append(`<table id=${meal.id}>
                      <caption class='meal-name'>${meal.name}</caption>
                      <tr><th>Ingredients</th><th>Calories</th><th></th></tr>
                      </table>`).append(mealFoods(meal))
}

const mealFoods = (meal) => {
  let foods = meal.foods
  foods.forEach((food) => {
    $(`table#${meal.id}`).append(`<tr class='${food.id} meal${food.id += 1}'>
    <td class='food-name'>${food.name}</td>
    <td class='calories'>${food.calories}</td>
    <td><a class='meal-food-delete'><i class="fa fa-minus-circle" aria-hidden="true"></i></a></td>
    </tr>`)
  })
  $('.meals').on('click', 'a.meal-food-delete', (e) => {
    let id = $(e.currentTarget).parent().parent().attr('class').split(' ')[0]
    let classNum = $(e.currentTarget).parent().parent().attr('class').split(' ')[1]
    let mealId = $(e.currentTarget).parent().parent().parent().parent()[0].id
    e.preventDefault()
    deleteFoodFromMeals(mealId, id, classNum)
  })
}

const getMeals = () => {
  $.get(`${api}/meals`, (data) => {
    $.each(data, (key, value) => {
      appendMeal(value)
    })
  })
}

const deleteFoodFromMeals = (mealId, id, classNum) => {
  $.ajax({
    type: 'DELETE',
    url: `${api}/meals/${mealId}/foods/${id}`
  }).then($(`tr.${classNum}`).remove())
}

module.exports = getMeals();
