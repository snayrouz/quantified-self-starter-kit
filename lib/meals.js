const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'

let appendMeal = (meal) => {
  $('.meals').append(`<table id=${meal.id}>
                      <caption class='meal-name'>${meal.name}</caption>
                      <tr><th>Ingredients</th><th>Calories</th><th></th></tr>
                      </table>`).append(mealFoods(meal))
}

let mealFoods = (meal) => {
  let foods = meal.foods
  foods.forEach((food) => {
    $(`table#${meal.id}`).append(`<tr class=${food.id}>
    <td class='food-name'>${food.name}</td>
    <td class='calories'>${food.calories}</td>
    <td><a class='meal-food-delete'><i class="fa fa-minus-circle" aria-hidden="true"></i></a></td>
    </tr>`)
  })
}

let deleteFoodId = $('.meals').on('click', 'a.meal-food-delete', (e) => {
  const id = $(e.target).parent().parent().parent()[0].id
  e.preventDefault()
})

let getMeals = () => {
  $.get(`${api}/meals`, (data) => {
    $.each(data, (key, value) => {
      appendMeal(value)
    })
  })
  deleteFoodId
}

// let deleteFoodId = $('.meals').on('click', 'a.meal-food-delete', (e) => {
//   let id = $(e.target).parent().parent().parent()[0].id
//   $.get(`${api}/meals`, data => {
//     data.forEach((datum) => {
//       datum.foods.filter((food) => {
//         if(id==food.id){
//           deleteFoodFromMeals(datum, id)
//           deleteFood(id)
//         }
//       })
//     })
//   })
//   e.preventDefault()
// })
//
// let deleteFood = (id) => {
//   $.ajax({
//     type: 'DELETE',
//     url: `${api}/foods/${id}`
//   }).then($(`tr#${id}`).remove())
// }

let deleteFoodFromMeals = (meal, id) => {
  $.ajax({
    type: 'DELETE',
    url: `${api}/meals/${meal.id}/foods/${id}`
  })
}

module.exports = getMeals();
