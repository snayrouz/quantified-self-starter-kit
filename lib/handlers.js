const $ = require('jquery')

const postSuccess = (data) => {
  prependFood(data)
}
// this function will post an error mssage if the fields are successfully filled out
const postError = (error) => {
  if(error.responseText.includes('name') && error.responseText.includes('calories')){
    // the responseText property will have the partial response as it arrives even before the request is complete.
    //  If responseType is set to anything other than the empty string or "text", accessing responseText
    //  will throw InvalidStateError exception.
    $('input.food').after('<p class="food-error">Please enter a food name</p>')
    $('input.calories').after('<p class="food-error">Please enter a calorie amount</p>')
  } else if(error.responseText.includes('name')) {
    $('input.food').after('<p class="food-error">Please enter a food name</p>')
  } else {
    $('input.calories').after('<p class="food-error">Please enter a calorie amount</p>')
  }
}

const appendFood = (food) => {
  $('tbody.foods-body').append(`<tr id=${food.id}>
                                <td class='food-name' contenteditable='true'>${food.name}</td>
                                <td class='food-calories' contenteditable='true'>${food.calories}</td>
                                <td><a class='delete' ><i class="fa fa-minus-circle" aria-hidden="true"></i></a></td>
                                </tr>`)
}

const prependFood = (food) => {
  $(`<tr id=${food.id}>
      <td class='food-name' contenteditable='true'>${food.name}</td>
      <td class='food-calories' contenteditable='true'>${food.calories}</td>
      <td><a class='delete' ><i class="fa fa-minus-circle" aria-hidden="true"></i></a></td>
      </tr>`).prependTo('tbody.foods-body')
}

module.exports = {postSuccess, postError, appendFood}
