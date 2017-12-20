import React, { Component } from 'react'

export default class FoodsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {foods: [
      {id: 0, name: 'apple', calories: 120}
      {id: 1, name: 'banana', calories: 190}
    ]}
  }
  render() {

  // const foodRows = this.stare.foods.map(food => {
  //    return( <tr key={food.id}>
  //              <td>  className=''><{food.name}</td>
  //              <td>  className=''><{food.calories}</td>
  //      )
  // })
    return (
      <table class='foods-table'>
        <tr>
          <th>Name</th>
          <th>Calories</th>
        </tr>
        <tbody class='foods-body'>
        // {foodRows}
        </tbody>
      </table>
    )
  }
}
