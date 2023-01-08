import React, { Component } from "react"

export default class Checkbox extends Component {
  render() {
    const { id, task, handleChange, checked } = this.props

    return (
      <div>
        <input
          id={id}
          type="checkbox"
          name={task}
          onChange={handleChange}
          checked={checked}
        />
        <label htmlFor={id}>{task}</label>
      </div>
    )
  }
}
