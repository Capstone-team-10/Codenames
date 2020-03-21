import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Title.css";

export default function Title() {
  return (
    <div className="title-container">
      <h1 className="title-name">CODENAMES</h1>
      <button className="title-button">
        <Link to="/auth">Want to be a spy?</Link>
      </button>
    </div>
  )
}
