const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'

let appendFood = (food) => {
  $('.food-table').append(`<tr id=${food.id}>
                          <td class='food-name'>${food.name}</td>
                          <td class='calories'>${food.calories}</td>
                          <td class='delete'><i class="fa fa-minus-circle" aria-hidden="true"></i></td>
                          </tr>`)
}

let $.delete = (food) => {
  $('td.delete').on('click', () => $(`tr#${food.id}`).remove())
}

let getFoods = () => {
  $.get(`${api}/foods`, (data) => {
    $.each(data, (key, value) => {
      let foodRow = appendFood(value)
    })
  })
}

module.exports = getFoods();
