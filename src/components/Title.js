import React from 'react'
import { Link } from 'react-router-dom'

export default function Title() {
  return (
    <div className="title-container">
      <h1 className="title-name">CODENAMES</h1>
      <button className="title-button">
        <Link to="/home">Want to be a spy?</Link>
      </button>
    </div>
  )
}
