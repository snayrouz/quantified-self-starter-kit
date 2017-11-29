const $ = require('jquery')
const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'

let appendFood = (food) => {
  let foods = $('.food-table').append(`<tr id=${food.id}>
                          <td class='food-name'>${food.name}</td>
                          <td class='calories'>${food.calories}</td>
                          </tr>`)
  // return foods
}

let getFoods = () => {
  $.get(`${api}/foods`, (data) => {
    console.log(data)
    $.each(data, (key, value) => {
      appendFood(value)
    })
  })
}

module.exports = getFoods();
