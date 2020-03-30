import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Title.css";

export default function Title() {
  return (
    <div className="title-container">
      <Link to="/auth/register">
      <button className="title-button">
        Want to be a spy?
      </button>
      </Link>
    </div>
  )
}
