const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'

let appendFood = (food) => {
  $('.food-table').append(`<tr id=${food.id}>
                          <td class='food-name'>${food.name}</td>
                          <td class='calories'>${food.calories}</td>
                          <td class='delete' ><a class="fa fa-minus-circle" aria-hidden="true"></a></td>
                          </tr>`)
}

let $delete = () => {
  $('table.food-table').on('click', 'a.fa.fa-minus-circle', (e) => {
    console.log(e.target)
  })
}

let getFoods = () => {
  $.get(`${api}/foods`, (data) => {
    $.each(data, (key, value) => {
      let foodRow = appendFood(value)
    })
  })
}

module.exports = getFoods();
