import React, { Component } from 'react'
import {Link} from "react-router-dom"

export default class UpdateUser extends Component {
  constructor(){
    super()
    this.state = {
        name: "Poppy",
        Email: "test@test.com",
    }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }
  submitHandler(event) {
    try {
      event.preventDefault()
      const {name, Email,} = this.state
      this.setState({
        name: '',
        Email: '',
      })
    }
    catch (error) {
       console.error(error)
    }
  }

  onChangeHandler(event) {
    try {
      this.setState({
        [event.target.name]: event.target.value
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div className="User">
      <div className="User-container">
        <h1>Edit Profile</h1>
        <form id="update" onSubmit={this.submitHandler}>
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input name="name" onChange={this.onChangeHandler} value={this.state.name}/>
        </div>
        <div className="input-field">
          <label htmlFor="Email">Email</label>
          <input type="email" name="Email" onChange={this.onChangeHandler} value={this.state.Email}/>
        </div>
        <button type="submit" className="btn center">
        <Link to="/userProfile">   {/* Delete after demo Demonstration */}
          submit
          </Link>
        </button>
      </form>
      </div>
      </div>
    )
  }
}
