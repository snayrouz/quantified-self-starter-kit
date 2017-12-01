const api = 'https://warm-sierra-65111.herokuapp.com/api/v1'

const appendFood = (food) => {
  $('.food-table').append(`<tr id=${food.id}>
                          <td class='food-name'>${food.name}</td>
                          <td class='calories'>${food.calories}</td>
                          <td><a class='delete' ><i class="fa fa-minus-circle" aria-hidden="true"></i></a></td>
                          </tr>`)
}

const deleteFoodId = $('.food-table').on('click', 'a.delete', (e) => {
  let id = $(e.target).parent().parent().parent()[0].id
  $.get(`${api}/meals`, data => {
    data.forEach((datum) => {
      datum.foods.filter((food) => {
        if(id==food.id){
          deleteFoodFromMeals(datum, id)
          deleteFood(id)
        }
      })
    })
  })
  e.preventDefault()
})

const deleteFood = (id) => {
  console.log('delete Food')
  $.ajax({
    type: 'DELETE',
    url: `${api}/foods/${id}`
  }).then($(`tr#${id}`).remove())
}

const deleteFoodFromMeals = (meal, id) => {
  console.log('delete food from meals')
  $.ajax({
    type: 'DELETE',
    url: `${api}/meals/${meal.id}/foods/${id}`
  })
}

const getFoods = () => {
  $.get(`${api}/foods`, (data) => {
    $.each(data, (key, value) => {
      let foodRow = appendFood(value)
    })
  })
  deleteFoodId
}

module.exports = getFoods();
